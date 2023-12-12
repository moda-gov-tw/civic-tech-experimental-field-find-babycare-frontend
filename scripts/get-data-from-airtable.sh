#!/bin/bash
# Replace these with your actual API Key, Base ID, and Table Name
API_KEY="<YOUR_API_KEY>"
BASE_ID="appfYDsNIRoD3ar7z"
TABLE_NAME="applications"

# Sort field and direction (asc or desc)
SORT_FIELD="sort"
SORT_DIRECTION="asc"  # or "desc"

# Initial URL with sorting
URL="https://api.airtable.com/v0/$BASE_ID/$TABLE_NAME?sort%5B0%5D%5Bfield%5D=$SORT_FIELD&sort%5B0%5D%5Bdirection%5D=$SORT_DIRECTION"

# Temporary file to store records
TEMP_FILE="temp_records.json"
echo "[]" > $TEMP_FILE

# Function to add new records to the temporary file
add_records_to_file() {
    jq -s '.[0] + .[1]' $TEMP_FILE <(echo $1 | jq .records) > temp && mv temp $TEMP_FILE
}

# Initial call to get the first set of records and the first offset
echo "Fetching records..."
RESPONSE=$(curl -s -H "Authorization: Bearer $API_KEY" "$URL")
add_records_to_file "$RESPONSE"
OFFSET=$(echo $RESPONSE | jq -r .offset)
echo "Fetched a batch of records..."

# Loop through all pages of records
while [ "$OFFSET" != "null" ]; do
    echo "Fetching more records..."
    RESPONSE=$(curl -s -H "Authorization: Bearer $API_KEY" "$URL&offset=$OFFSET")
    add_records_to_file "$RESPONSE"
    OFFSET=$(echo $RESPONSE | jq -r .offset)
    echo "Fetched a batch of records..."
done

# Final JSON file
FINAL_JSON_FILE="$TABLE_NAME.json"
mv $TEMP_FILE $FINAL_JSON_FILE
echo "All records fetched. Records saved to $FINAL_JSON_FILE"

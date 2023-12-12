import data from './mocks/applications.json';

// @see https://airtable.com/appfYDsNIRoD3ar7z/tbluSf2K9duCtoUZQ/viwtSsTsHUf1ViNFu?blocks=show
export const waitlist = data.records
  .filter(d => d.fields.application_status === '3');

export const applications = data.records
  .filter(d => d.fields.selected_daycare.includes('recAEvhFthd6yHdeg')); // 公設民營梧棲三民托嬰中心

export const submitted = data.records
  .filter(d => d.fields.applicant_id === 'XY0001');

export const allData = data;

// 報名狀態
// @see https://docs.google.com/document/d/1MbHYx2ag-j7dzFc8pxnH_rgyRLVJPKbG_vOOgbrcikU/edit
export const APPLICATION_STATUS = [
  'SUBMITTED', // 0 報名審核中
  'APPLICATION_RETURNED', // 1 報名被退回
  'RAFFLE_APPROVED', // 2 等待抽籤
  'WAITLIST_APPROVED', // 3 候補中
  'WITHDREW', // 4 撤回
  'ACCEPTED', // 5 錄取
  'REGISTERED', // 6 報到審核中
  'REGISTRATION_RETURNED', // 7 報到被退回
  'FORFEITED', // 8 放棄入托
  'REJECTED', // 9 不符合報名資格
];

export const APPLICATION_STATUS_I18N = {
  SUBMITTED: 'status.submitted',
  APPLICATION_RETURNED: 'status.application_returned',
  RAFFLE_APPROVED: 'status.raffle_approved',
  WAITLIST_APPROVED: 'status.waitlist_approved',
  WITHDREW: 'status.withdrew',
  ACCEPTED: 'status.accepted',
  REGISTERED: 'status.registered',
  REGISTRATION_RETURNED: 'status.registration_returned',
  FORFEITED: 'status.forfeited',
  REJECTED: 'status.rejected',
};

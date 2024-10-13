export type RequestIdResponse = {
  exportId: string;
};

export type CheckStatusResponse = {
  isCompleted: boolean;
  downloadUrl: string | null;
  expirationDate: string | null;
};

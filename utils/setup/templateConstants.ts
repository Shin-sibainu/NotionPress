// src/constants/templateConstants.ts

export const PAID_TEMPLATE_IDS = [2, 3, 4];

export const isPaidTemplate = (templateId: number): boolean =>
  PAID_TEMPLATE_IDS.includes(templateId);

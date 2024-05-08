export const templateIdToTemplateName = (templateId: number) => {
  let templateName;

  switch (templateId) {
    case 1:
      templateName = "basic";
      break;
    case 2:
      templateName = "classic";
      break;
    default:
      templateName = "";
  }

  return templateName;
};

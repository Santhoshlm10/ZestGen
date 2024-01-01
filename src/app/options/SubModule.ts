// optins for person submodule
const personSubmoduleList = [
  {
    value: "bio",
    label: "Bio",
  },
  {
    value: "firstname",
    label: "First Name",
  },
  {
    value: "fullName",
    label: "Full Name",
  },
  {
    value: "gender",
    label: "Gender",
  },
  {
    value: "jobArea",
    label: "Job Area",
  },
  {
    value: "jobDescriptor",
    label: "Job Descriptor",
  },
  {
    value: "jobTitle",
    label: "Job Title",
  },
  {
    value: "jobType",
    label: "Job Type",
  },
  {
    value: "lastName",
    label: "Last Name",
  },
  {
    value: "middleName",
    label: "Middle Name",
  },
  {
    value: "prefix",
    label: "Prefix",
  },
  {
    value: "sex",
    label: "Sex",
  },
  {
    value: "middleName",
    label: "Middle Name",
  },
  {
    value: "sexType",
    label: "Sex Type",
  },
  {
    value: "suffix",
    label: "Suffix",
  },
  {
    value: "zodiacSign",
    label: "Zodiac Sign",
  },
];

export const getSubmoduleByModule = (moduleName: string) => {
  switch (moduleName) {
    case "person":
      return personSubmoduleList;
    default:
      return [];
  }
};

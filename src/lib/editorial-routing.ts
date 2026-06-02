const editorialCaseStudySlugByCompany: Record<string, string> = {
  Opendoor: "opendoor",
  DraftKings: "draftkings",
  Coinbase: "coinbase",
  Dropbox: "dropbox-spaces",
};

export function getEditorialCaseStudyHrefForCompany(company: string) {
  const slug = editorialCaseStudySlugByCompany[company];

  return slug ? `/work/${slug}` : null;
}

const editorialCaseStudySlugByCompany: Record<string, string> = {
  Opendoor: "opendoor",
  DraftKings: "draftkings",
  Coinbase: "coinbase",
  Dropbox: "dropbox-spaces",
};

export function getEditorialCaseStudySlugForCompany(company: string) {
  return editorialCaseStudySlugByCompany[company] ?? null;
}

export function getEditorialCaseStudyHrefForCompany(company: string) {
  const slug = getEditorialCaseStudySlugForCompany(company);

  return slug ? `/work/${slug}` : null;
}

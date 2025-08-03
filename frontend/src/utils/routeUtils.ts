export const normalizeRouteParam = (param: string): string => {
  return param.toLowerCase()
    .replace(/\s*-\s*/g, '-') // normalize existing hyphens
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, ''); // remove leading/trailing hyphens
};

export const getTournamentRouteId = (tournamentName: string): string => {
  const tournamentMap: Record<string, string> = {
    'BNP Paribas Open - Indian Wells': 'indian-wells',
    'Indian Wells': 'indian-wells',
    'Miami Open': 'miami-open',
    'Australian Open': 'australian-open'
  };
  
  return tournamentMap[tournamentName] || normalizeRouteParam(tournamentName);
};

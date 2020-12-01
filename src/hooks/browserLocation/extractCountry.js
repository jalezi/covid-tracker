const extractCountry = res => {
  try {
    return res.results
      .reduce((comps, res) => comps.concat(res.address_components), [])
      .filter(x => x)
      .find(comp => comp.types.includes('country')).long_name;
  } catch (e) {
    throw new Error(`Cannot get country code from Google Maps response`);
  }
};

export default extractCountry;

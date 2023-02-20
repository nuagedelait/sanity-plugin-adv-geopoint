import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "xhrri5lt",
  dataset: "production",
  apiVersion: "2021-10-21",
  token: `skFBsT3Hm18Jt5GNIMHsrE8xlVDasWzVtaL4c2xUc2Iy1MGinDQe6frAmUiQ7gGxV2fzNVv6Jdu324DXokZ6m0hRGb06JPKpML96AVhKBpnAvBTmIMwFrlQZEhYtkg7uiKiX9bE6mPLtjdahaolIEMHVB9JToK5x035VWkxoFkDpNCyjxCKE`, // You need to have write permission
});

function slugify(source: any) {
  return source
    .toString() // Cast to string
    .toLowerCase() // Convert the string to lowercase letters
    .normalize("NFD") // The normalize() method returns the Unicode Normalization Form of a given string.
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
export default (value: any, callback: Function): void => {
  const street = `${value.route ? `${value.route}, ` : ""}${
    value.street_number ? value.street_number : ""
  }`;

  client
    .create({
      _type: "address",
      title: `${value.name}`,
      slug: {
        _type: "slug",
        current: `${slugify(value.name)}`,
      },
      street: street,
      postalcode: `${value.postal_code ? value.postal_code : ""}`,
      city: `${value.locality}`,
      country: `${value.country.toLowerCase()}`,
    })
    .then((result) => {
      if (result._id) {
        return callback("success", `Created Address with id: ${result._id}`);
      }
      return callback("error", JSON.stringify(result));
    });
};

import { createLocalePageRoute } from "../../../lib/i18n/route-factory";

const { Component, handle, meta } = createLocalePageRoute("en", "terms");

export { handle, meta };
export default Component;

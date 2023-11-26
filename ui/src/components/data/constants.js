/** @module constants */

import {
  faFileContract,
  faGift,
  faHandHoldingDollar,
  faTag
} from "@fortawesome/free-solid-svg-icons";

export const DEFAULT_PAGE_SIZE = 50;
export const DEFAULT_ORDER_BY = "name";

export const TEXT_REQUIRED = "Required";

export const DATE_FORMAT = "YYYY-MM-DD";

export const OWNERSHIP_STATUS_OPTIONS = [
  {
    value: "PUR",
    label: "Purchased"
  },
  {
    value: "UCT",
    label: "Under Contract",
    icon: faFileContract
  },
  {
    value: "FSA",
    label: "For Sale",
    icon: faTag
  },
  {
    value: "SLD",
    label: "Sold",
    icon: faHandHoldingDollar
  },
  {
    value: "GFT",
    label: "Gifted",
    icon: faGift
  }
];

export const COUNTRY_OPTION_DEFAULTS = ["United States"];

export const INSTRUMENT_OPTION_DEFAULTS = ["Guitar"];

export const SOUNDSCAPE_OPTION_DEFAULTS = [
  "Acoustic",
  "Acoustic/Electric",
  "Classical/Nylon",
  "Electric",
  "Electric Stereo"
];

export const COLOR_OPTION_DEFAULTS = [
  "Black",
  "Natural",
  "Red",
  "Tobacco Sunburst"
];

export const TUNING_OPTION_DEFAULTS = [
  "Standard/EADGBE",
  "Drop-D/DADGBE",
  "D-Scale/DGCFAD"
];

export const STATUS_OPTION_DEFAULTS = [
  "Playable",
  "Display Only",
  "In Need of Repairs",
  "In Transit",
  "For Sale",
  "Offsite for Repairs",
  "Sold or Gifted"
];

export const CAPTION_OPTION_DEFAULTS = [
  "Full Front",
  "Full Side",
  "Body Front",
  "Body Back",
  "Headstock Front",
  "Headstock Back",
  "Label",
  "Serial Number",
  "Case"
];

export const SPEC_OPTION_DEFAULTS = [
  "Body Material",
  "Body Type",
  "Bridge",
  "Decorations",
  "Electronics",
  "Fretboard",
  "Hardware",
  "Neck Length",
  "Neck Material",
  "Nut Material",
  "Nut Width",
  "Pickups",
  "Pre-Amp",
  "Scale Length",
  "Sound Hole",
  "Tailpiece",
  "Tuners",
  "Reference Link^",
  "Other"
];

export const TODO_OPTION_DEFAULTS = [
  "Not Started",
  "In Progress",
  "On Hold",
  "Completed"
];

export const PERMISSIONS_OPTIONS = [
  "EDIT_USER",
  "EDIT_GUITAR",
  "EDIT_BRAND",
  "VIEW_PURCHASE_HISTORY"
];

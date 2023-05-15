/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import { utils } from "near-api-js";
import { PUBLIC_PINATA_URL } from "./constants";

export const getWholeImageUrl = (src: string) => {
  if (!src) return "/default.png";
  if (src.startsWith("https://")) return src;
  return PUBLIC_PINATA_URL + src;
};
export const protectAgainstNaN = (value: number) => (isNaN(value) ? 0 : value);

export function convertMicroDenomToDenom(value: number | string, decimals = 0): number {
  if (decimals === 0) return Number(value);
  return protectAgainstNaN(Number(value) / Math.pow(10, decimals));
}

export function convertDenomToMicroDenom(value: number | string, decimals = 0): number {
  if (decimals === 0) return Number(value);
  return protectAgainstNaN(parseInt(String(Number(value) * Math.pow(10, decimals)), 10));
}

export function convertFromMicroDenom(denom: string) {
  return denom?.substring(1).toUpperCase();
}

export function convertToFixedDecimals(value: number | string): string {
  const amount = Number(value);
  return amount > 0.01 ? amount.toFixed(2) : String(amount);
}

export function convertToFixedDecimalNumber(value: number | string): number {
  const amount = Number(value);
  return Number(amount.toFixed(2));
}

export const formatTokenName = (name: string) => {
  if (name) {
    return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
  }
  return "";
};

export const createBalanceFormatter = ({
  maximumFractionDigits = 4,
  ...options
}: Omit<Parameters<typeof Intl.NumberFormat>[1], "style" | "currency"> = {}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits,
    ...options,
    style: "currency",
    currency: "USD",
  });

  return (value: string | number, { includeCommaSeparation = false, applyNumberConversion = true } = {}) => {
    const formattedValue = formatter.format(!isNaN(value as number) ? (value as number) : 0).replace(/\$/g, "");

    if (includeCommaSeparation) {
      return formattedValue;
    }

    const rawValue = formattedValue.replace(/\,/g, "");
    if (applyNumberConversion) {
      return Number(rawValue);
    }

    return rawValue;
  };
};
export function getLongAddress(address: string) {
  if (address?.length > 25) return address.slice(0, 25);
  return address;
}

export const getReducedAddress = (address: string, length = 10, offset = 4) => {
  if (address?.length > length) return `${address.slice(0, offset)}...${address.slice(-offset)}`;
  return address;
};
export const formatNearToYocto = (balance: number | string) => {
  return utils.format.parseNearAmount(balance.toString());
};
export const formatTokenBalance = createBalanceFormatter();

export const dollarValueFormatterWithDecimals = createBalanceFormatter({
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export const dollarValueFormatter = createBalanceFormatter({
  maximumFractionDigits: 2,
});
export const valueFormatter18 = createBalanceFormatter({
  maximumFractionDigits: 18,
});
export const valueFormatter6 = createBalanceFormatter({
  maximumFractionDigits: 6,
});

export const validateUri = (uri: string) => {
  if (!uri || uri === "_") return false;
  return true;
};

export const formatTimestamp = (timestamp: number) => {
  const days = Math.floor(timestamp / 86400);
  timestamp -= days * 86400;
  const hours = Math.floor(timestamp / 3600);
  timestamp -= hours * 3600;
  const minutes = Math.floor(timestamp / 60);
  return `${days} days ${hours} hours ${minutes} minutes`;
};

export const formatDateWithSlash = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

export const numberToSequence = (number) => {
  if (number % 10 === 1) return `${number}st`;
  if (number % 10 === 2) return `${number}nd`;
  if (number % 10 === 3) return `${number}rd`;
  return `${number}th`;
};

export const formatChakraDateToTimestamp = (dateAndTime) => {
  const date = dateAndTime.replace("T", "-").replace(":", "-").split("-");
  return Number(new Date(date[0], date[1] - 1, date[2], date[3], date[4]));
};

export const formatTimestampToDate = (strTimestamp) => {
  const timestamp = Number(strTimestamp) / 1000000;
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};
export const emptyObject = (object) => {
  for (const name in object) {
    if (object.hasOwnProperty(name)) {
      delete object[name];
    }
  }
};

export const getStandardTime = (time: string) => {
  const utcTime = new Date(time);
  const year = utcTime.getFullYear() % 2000;
  const day = utcTime.getDate();
  const month = utcTime.getMonth() + 1;
  const hour = utcTime.getHours();
  const min = utcTime.getMinutes();
  const sec = utcTime.getSeconds();
  return `${day}-${month}-'${year}, ${hour}:${min}:${sec}`;
};
export const checkRegularExp = (data: string) => {
  const regexp = /^[A-Za-z0-9_-]*$/;
  return regexp.test(data);
};
export const getValidVr = (value: string) => {
  if (!value) return null;
  if (value.length === 19 && value.startsWith("16")) return null;
  return value;
};

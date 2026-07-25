class DateHelper {
  static getFormatDateTime(strDateTime) {
    try {
      const d = new Date(strDateTime);

      if (isNaN(d)) {
        console.log(strDateTime);
        console.log(d);
        return "Invalid Date";
      }

      const YYYY = d.getFullYear();
      const MM = String(d.getMonth() + 1).padStart(2, "0");
      const DD = String(d.getDate()).padStart(2, "0");

      const HH = String(d.getHours()).padStart(2, "0");
      const MI = String(d.getMinutes()).padStart(2, "0");
      const SS = String(d.getSeconds()).padStart(2, "0");

      return [DD, ".", MM, ".", YYYY, " ", HH, ":", MI, ":", SS].join("");
    } catch (exception) {
      return `${exception}`;
    }
  }
}

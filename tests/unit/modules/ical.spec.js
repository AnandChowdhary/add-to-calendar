import ical from "@/modules/ical";
describe("ical.js", () => {
  it("returns the right iCal contents", () => {
    expect(
      ical(
        {
          uid: "sample",
          title: "Coffee",
          timestamp: "20180917T174940Z",
          datetime: 0,
          duration: 0,
          location: "Place name, address"
        },
        "Europe/Amsterdam"
      ).replace(/\r?\n|\r/g, "")
    ).toMatch(
      `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Anand Chowdhary//Calendar Event Link//EN
BEGIN:VEVENT
UID:sample@localhost
SEQUENCE:0
DTSTAMP:20180917T174940Z
DTSTART:19700101T000000Z
DTEND:19700101T000000Z
SUMMARY:Coffee
LOCATION:Place name\\, address
END:VEVENT
END:VCALENDAR`.replace(/\r?\n|\r/g, "")
    );
  });
});

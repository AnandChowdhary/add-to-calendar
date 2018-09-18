import google from "@/modules/google";
describe("google.js", () => {
  it("returns the right Add to Google Calendar URL", () => {
    expect(
      google(
        {
          title: "Coffee",
          datetime: 0,
          duration: 0,
          location: "Place name, address"
        },
        "Europe/Amsterdam"
      )
    ).toMatch(
      "https://calendar.google.com/calendar/r/eventedit?text=Coffee&dates=19700101T000000Z/19700101T000000Z&location=Place%20name%2C%20address&pli=1&sf=true&output=xml"
    );
  });
});

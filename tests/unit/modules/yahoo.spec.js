import yahoo from "@/modules/yahoo";
describe("yahoo.js", () => {
  it("renders props.msg when passed", () => {
    expect(
      yahoo(
        {
          title: "Coffee",
          datetime: 0,
          duration: 0,
          location: "Place name, address"
        },
        "Europe/Amsterdam"
      )
    ).toMatch(
      "http://calendar.yahoo.com/?v=60&TITLE=Coffee&ST=19700101T010000&in_loc=Place%20name%2C%20address&DESC=&DUR=0000"
    );
  });
});

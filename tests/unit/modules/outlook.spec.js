import outlook from "@/modules/outlook";
describe("outlook.js", () => {
  it("renders props.msg when passed", () => {
    expect(
      outlook(
        {
          title: "Coffee",
          datetime: 0,
          duration: 0,
          location: "Place name, address"
        },
        "Europe/Amsterdam"
      )
    ).toMatch(
      "https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent&subject=Coffee&startdt=19700101T000000Z&enddt=19700101T000000Z&location=Place%20name%2C%20address&body=&allday="
    );
  });
});

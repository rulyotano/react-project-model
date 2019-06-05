import { urlJoin } from "./helperService";

const part1 = "part1";
const part2 = "part2";
const part3 = "part3";

describe("Helper Service Tests", () => {
  describe("Test urlJoin method", () => {
    test("should join all parts", () => {
      const result = urlJoin(part1, part2, part3);
      expect(result).toBe(`${part1}/${part2}/${part3}`);
    });

    test("If first part start with /, result should start with /", () => {
      const result = urlJoin(`/${part1}`, part2, part3);
      expect(result).toBe(`/${part1}/${part2}/${part3}`);
    });
  });
});

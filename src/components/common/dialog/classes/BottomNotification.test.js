import moment from "moment";
import BottomNotification from "./BottomNotification";
import Notification, { NotificationTypes } from "./Notification";

test("create a bttom notification", () => {
  const bottomNotification = new BottomNotification();
});

test("bottom notification should be notification", () => {
  const bottomNotification = new BottomNotification();

  expect(bottomNotification instanceof Notification).toBe(true);
});

it("default propos", () => {
  const bottomNotification = new BottomNotification();
  expect(bottomNotification.Title).toBe("");
  expect(bottomNotification.Description).toBe("");
  expect(bottomNotification.Type).toBe(NotificationTypes.NOTIFICATION);
  expect(moment.isMoment(bottomNotification.TimeToClose)).toBe(true);
  expect(bottomNotification.TimeToClose.format("YYYY-MM-DD HH:mm:ss")).toBe(
    moment().format("YYYY-MM-DD HH:mm:ss")
  );
});

it("pass props to base constructor", () => {
  const bottomNotification = new BottomNotification(
    "title1",
    "desc1",
    NotificationTypes.ERROR
  );
  expect(bottomNotification.Title).toBe("title1");
  expect(bottomNotification.Description).toBe("desc1");
  expect(bottomNotification.Type).toBe(NotificationTypes.ERROR);
});

it("should have prop TimeToClose", () => {
  const timeToClose = moment();
  const bottomNotification = new BottomNotification(
    "title1",
    "desc1",
    NotificationTypes.ERROR,
    timeToClose
  );
  expect(bottomNotification.TimeToClose).toBe(timeToClose);
});

it('should have method "shouldClose"', () => {
  const timeToClose = moment();
  const bottomNotification = new BottomNotification(
    "title1",
    "desc1",
    NotificationTypes.ERROR,
    timeToClose
  );
  expect(bottomNotification.shouldClose).toBeDefined();
});

it('"shouldClose" should return true for pasts TimeToClose dates', () => {
  let timeToClose = moment().add(-10, "minutes");
  let bottomNotification = new BottomNotification(
    undefined,
    undefined,
    undefined,
    timeToClose
  );
  expect(bottomNotification.shouldClose()).toBe(true);

  timeToClose = moment().add(-1, "seconds");
  bottomNotification = new BottomNotification(
    undefined,
    undefined,
    undefined,
    timeToClose
  );
  expect(bottomNotification.shouldClose()).toBe(true);
});

it('"shouldClose" should return false for future TimeToClose dates', () => {
  let timeToClose = moment().add(10, "minutes");
  let bottomNotification = new BottomNotification(
    undefined,
    undefined,
    undefined,
    timeToClose
  );
  expect(bottomNotification.shouldClose()).toBe(false);

  timeToClose = moment().add(1, "seconds");
  bottomNotification = new BottomNotification(
    undefined,
    undefined,
    undefined,
    timeToClose
  );
  expect(bottomNotification.shouldClose()).toBe(false);
});

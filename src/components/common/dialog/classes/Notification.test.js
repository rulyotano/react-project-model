import Notification, { NotificationTypes } from "./Notification";

test("create a notification", () => {
  new Notification();
});

it("pass constructor params to props", () => {
  const notification = new Notification(
    "title1",
    "desc1",
    NotificationTypes.ERROR
  );
  expect(notification.Title).toBe("title1");
  expect(notification.Description).toBe("desc1");
  expect(notification.Type).toBe(NotificationTypes.ERROR);
});

it("defaults values in Notification", () => {
  const notification = new Notification();
  expect(notification.Title).toBe("");
  expect(notification.Description).toBe("");
  expect(notification.Type).toBe(NotificationTypes.NOTIFICATION);
});

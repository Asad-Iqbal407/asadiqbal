type MongooseType = typeof import("mongoose");

declare global {
  var mongoose:
    | {
        conn: MongooseType | null;
        promise: Promise<MongooseType> | null;
      }
    | undefined;
}

export {};


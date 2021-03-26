export default {
  origin: (origin, callback) => {
    const passIfWhiteOrigin = (regex) => {
      if (regex.test(origin)) {
        callback(null, true);
        return true;
      }
    };

    if (passIfWhiteOrigin(/localhost/)) return;
    if (passIfWhiteOrigin(/service\.gomicorp\.com/)) return;

    callback(new Error("Not allowed origin"));
  },
  // allowedHeaders: [
  //   "Origin",
  //   "X-Requested-With",
  //   "Accept",
  //   "Content-Type",
  //   "Authorization",
  // ],
  methods: ["GET", "PUT", "OPTIONS", "POST", "PATCH", "DELETE"],
};

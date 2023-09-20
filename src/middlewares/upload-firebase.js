const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");

const storage = new Storage({
  keyFilename: "",
});

module.exports =
  (config = {}) =>
  async (req, res, next) => {
    try {
      config = Object.assign(
        {
          multiple: false,
          key: "file",
          required: true,
        },
        config
      );

      // Verify if the file is present
      if (!req.files && config.require)
        throw new Error("No files were uploaded.");
      if (!req.files) return next();

      // Verify if the file is an array
      if (!config.multiple && !req.files[config.key])
        throw new Error(`To upload file use the key "${config.key}"`);

      let filename = uuidv4() + "-" + req.files[config.key].name;
      const storage = new firebase.storage();
      let file = await storage
        .bucket(process.env.FIREBASE_STORAGE_BUCKET)
        .file(filename);
      req.files[config.key].firebase = file;

      await file.save(req.files[config.key].data);

      return next();
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

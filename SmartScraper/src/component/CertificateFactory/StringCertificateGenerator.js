const fs = require("fs");
const path = require("path");

const { GenerateCertificate } = require("./GenerateCertificate.js");
class StringCertificateGenerator extends GenerateCertificate {
  constructor(options, hostname, certsDir) {
    super(hostname.split(".")[0], hostname, certsDir);
    if (!options.match(/-s|--string|string/)) {
      throw new Error(`Invalid option: ${options}`);
    }
    if (!hostname.match(/.*\.com|net|org$/)) {
      throw new Error(
        `Invalid hostname: ${hostname}. Second parameter must be a valid certificate config file with extension ["*.req"].`
      );
    }
    this.hostname = hostname.trim() || false;
    if (!this.hostname) {
      throw new Error(
        "Configuration file error: unable to locate certificate request file, not defined."
      );
    }
    if (!fs.existsSync(certsDir)) {
      fs.mkdirSync(certsDir);
    }
    this.certsDir = path.resolve(certsDir);
    this.domainPrefix = hostname.split(".")[0];
    console.log("Entry is a file.");
    this.generateCertificate = this.generateCertificate.bind(this);
  }
}

module.exports = { StringCertificateGenerator };

// File Certificate Generator
const fs = require("fs");
const path = require("path");
const { GenerateCertificate } = require("./GenerateCertificate.js");
const { CertificateConfigFileFactory } = require("./CertificateConfigFileFactory.js");

class FileCertificateGenerator extends GenerateCertificate {
  constructor(options, hostnameFile, certsDir = process.cwd()) {
    super(hostnameFile.split(".")[1], hostnameFile, certsDir);
    if (!options.match(/-f|--file/)) {
      throw new Error(`Invalid option: ${options}`);
    }
    this.options = options;
    if (!hostnameFile.match(/.*\.req$/) || !fs.existsSync(hostnameFile)) {
      throw new Error(
        `File not found: ${hostnameFile}. Second parameter must be a valid certificate config file with extension ["*.req"].`
      );
    }
    this.hostname = hostnameFile || false;
    if (!this.hostname) {
      throw new Error(
        "Configuration file error: unable to locate hostname, undefined."
      );
    }
    if (!fs.existsSync(certsDir)) {
      fs.mkdirSync(certsDir);
    }
    this.domainPrefix = hostnameFile.split(".")[1];
    this.certsDir = path.resolve(certsDir);
    console.log("Entry is a file.");
    this.generateCertificate = super.generateCertificate.bind(this);
  }
}

module.exports = { FileCertificateGenerator };

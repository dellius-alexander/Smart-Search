const fs = require("fs");
const path = require("path");
const { GenerateCertificate } = require("./GenerateCertificate.js");

class ConfigCertificateGenerator extends GenerateCertificate {
  constructor(options, certificateConfigFile, certsDir) {
    super(options, certificateConfigFile,certsDir );
    if (!options.match(/-c|--config/)) {
      throw new Error(`Invalid option: ${options}`);
    }
    this.options = options;
    if (
      !certificateConfigFile.match(/.*\.req$/) ||
      !fs.existsSync(certificateConfigFile)
    ) {
      throw new Error(
        `File not found: ${certificateConfigFile}. Second parameter must be a valid certificate config file with extension ["*.req"].`
      );
    }
    this.certificateConfigFile = path.resolve(certificateConfigFile);
    this.certsDir = path.resolve(certsDir);
    this.hostname = super.getCommonName(this.certificateConfigFile).trim();
    this.domainPrefix = this.hostname.split(".")[0];
    console.log("Entry is a file.");
    super.generateCertificate = super.generateCertificate.bind(this);
    console.dir(this);
  }


}

module.exports = { ConfigCertificateGenerator };

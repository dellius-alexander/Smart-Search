const fs = require("fs");
const path = require("path");
const { GenerateCertificate } = require("./GenerateCertificate");

class ConfigCertificateGenerator {
  constructor(options, certificateConfigFile, certsDir) {
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
    this.hostname = this.getCommonName(this.certificateConfigFile).trim();
    this.domainPrefix = this.hostname.split(".")[0];
    console.log("Entry is a file.");
    this.generateCertificate = this.generateCertificate.bind(this);
    console.dir(this);
  }
  generateCertificate(
    hostname = this.hostname || null,
    certsDir = this.certsDir || process.cwd(),
    domainPrefix = this.domainPrefix || null
  ) {
    const generateCertificate = new GenerateCertificate(
      domainPrefix,
      hostname,
      certsDir
    );
    console.log(
      generateCertificate.generateCertificate(hostname, certsDir, domainPrefix)
    );
  }

  getCommonName(certificateFilePath) {
    const configFile = fs.readFileSync(certificateFilePath, "utf8");

    const lines = configFile
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const configValues = {};

    for (let line of lines) {
      if (line.startsWith(["#", "["])) continue;
      const parts = line.split("=");
      const key = parts[0].trim();
      configValues[key] = parts[1];
    }

    const example_url = configValues.commonName;

    console.log(example_url); // example.com
    return example_url;
  }
}

module.exports = { ConfigCertificateGenerator };

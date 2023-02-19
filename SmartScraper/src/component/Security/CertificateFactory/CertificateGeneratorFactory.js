const { StringCertificateGenerator } = require("./StringCertificateGenerator.js");
const { FileCertificateGenerator } = require("./FileCertificateGenerator.js");
const {
  DefaultCertificateGenerator,
} = require("./DefaultCertificateGenerator.js");
const { ConfigCertificateGenerator } = require("./ConfigCertificateGenerator.js");

// Define Certificate Generator IDefaultStrategy
class CertificateGeneratorFactory {
  getCertificateGenerator(options, hostname, certDir) {
    switch (options) {
    case "-f" || "--file": // passing a file containing the hostname.
      return new FileCertificateGenerator(options, hostname, certDir);
    case "-s" || "--string": // passing a string containing the hostname
      return new StringCertificateGenerator(options, hostname, certDir);
    case "-d" || "--default": // default hostname used is example.com, no second parameter should be entered
      // eslint-disable-next-line no-case-declarations
      return new DefaultCertificateGenerator(options, hostname, certDir);
    case "-c" || "--config": // hostname should contain the config file path to be used in certificate generation.
      // If no config file path is found "example.com" will be used to create certificates.
      // eslint-disable-next-line no-case-declarations
      return new ConfigCertificateGenerator(options, hostname, certDir);
    default:
      console.log("Usage:");
      console.log(
        "const certGen = new CertificateGenerator('-d','example.com', './certs');"
      );
      console.log("certGen.run();");
      console.log("OPTIONS:");
      console.log("-f | --file: passing a file containing the hostname.");
      console.log("-s | --string: passing a string containing the hostname.");
      console.log(
        "-d | --default: default hostname used is example.com, no second parameter should be entered."
      );
      console.log(
        "-c | --config: config file to be used in certificate generation.\n" +
          "If no config file is provided one will be created from hostname.\n" +
          "The hostname parameter should be the path to the config file."
      );
      console.log("-h | --help: this help message.");
      process.exit(1);
    }
  }
}

module.exports = { CertificateGeneratorFactory };

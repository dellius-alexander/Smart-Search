const { StringCertificateGenerator } = require("./StringCertificateGenerator");
const { FileCertificateGenerator } = require("./FileCertificateGenerator");
const {
  DefaultCertificateGenerator,
} = require("./DefaultCertificateGenerator");
const { ConfigCertificateGenerator } = require("./ConfigCertificateGenerator");

// Define Certificate Generator Factory
class CertificateGeneratorFactory {
  static getCertificateGenerator(options, hostname, certDir) {
    switch (options) {
    case "-f" || "--file": // passing a file containing the hostname.
      return new FileCertificateGenerator(options, hostname, certDir);
    case "-s" || "--string": // passing a string containing the hostname
      return new StringCertificateGenerator(options, hostname, certDir);
    case "-d" || "--default": // default hostname used is example.com, no second parameter should be entered
      // eslint-disable-next-line no-case-declarations
      return new DefaultCertificateGenerator(options, "example.com", certDir);
    case "-c" || "--config": // config file to be used in certificate generation. If no config file is provided one will be created from hostname.
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
        "-c | --config: config file to be used in certificate generation. If no config file is provided one will be created from hostname."
      );
      console.log("-h | --help: this help message.");
      process.exit(1);
    }
  }
}

module.exports = { CertificateGeneratorFactory };

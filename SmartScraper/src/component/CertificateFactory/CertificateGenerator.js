const fs = require("fs");
const path = require("path");
const {
  CertificateGeneratorFactory,
} = require("./CertificateGeneratorFactory.js");

class CertificateGenerator {
  constructor(options, hostname, certDir) {
    this.options = options;
    this.hostname = hostname;
    this.certsDir = certDir;
    this.run = this.run.bind(this);
  }

  run() {
    // create the cert directory if it doesn't exist
    if (!this.certsDir && !fs.existsSync(this.certsDir)) {
      console.log(
        "Certificate directory not found. Creating from input: [$_CERTS_DIR]"
      );
      fs.mkdirSync(this.certsDir || ".");
    }
    // Get correct generator form the CertificateGeneratorFactory
    // get certificate generator instance
    
    const certificateGeneratorFactory = new CertificateGeneratorFactory();
    const certificateGenerator = certificateGeneratorFactory.getCertificateGenerator(
      this.options,
      this.hostname,
      this.certsDir
    );
    // use certificateGenerator instance to generate the certificate
    return certificateGenerator.generateCertificate();
  }

}

module.exports = { CertificateGenerator };
//
// const certGen = new CertificateGenerator(
//   "-f",
//   "./certs/example.req",
//   "./certs"
// );
// certGen.run();

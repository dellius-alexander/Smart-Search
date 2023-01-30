const fs = require('fs');

class CertificateConfigFileFactory {
    static create(domainPrefix = null, hostname = null, _certDir = null) {
        return new CertificateConfigFile(domainPrefix, hostname, _certDir);
    }
}

class CertificateConfigFile {
    constructor(domainPrefix = null, hostname = null, certDir = null) {
        if (!hostname || !domainPrefix) {
            throw new Error('Configuration file error: unable to locate certificate request file, not defined.');
        }
        if (!fs.existsSync(certDir)){
            fs.mkdirSync(certDir);
        }
        this.domainPrefix = domainPrefix;
        this.hostname = hostname.trim();
        this.certsDir = certDir;
        this.generateConfig = this.generateConfig.bind(this);
    }
    /**
     * Generate Random Config File
     * @param {String} domainPrefix
     * @param {String} hostname
     * @param {String} _certDir
     * @return {String} path to the generated certificate config file.
     */
    generateConfig(domainPrefix = this.domainPrefix, hostname = this.hostname, _certDir = this.certsDir) {
        try {
            console.log(`Attempting to generate config file for: ${hostname} @ ${_certDir}/${domainPrefix}.req`);
            // Generate new config file with defined domain name
            const configData = `
  [ req ]
  default_bits        = 2048
  default_keyfile     = ${domainPrefix}.key
  distinguished_name  = subject
  req_extensions      = req_ext
  x509_extensions     = x509_ext
  string_mask         = utf8only
  prompt              = no

  [ subject ]
  countryName         = US
  stateOrProvinceName = GA
  localityName        = Atlanta
  organizationName    = Hyfi Solutions
  commonName          = ${hostname}
  emailAddress        = admin@${hostname}

  # Section x509_ext is used when generating a self-signed certificate.
  [ x509_ext ]
  subjectKeyIdentifier    = hash
  authorityKeyIdentifier  = keyid,issuer
  basicConstraints        = CA:FALSE
  keyUsage                = digitalSignature, keyEncipherment
  subjectAltName          = @alternate_names
  nsComment               = "OpenSSL Generated Certificate"
  extendedKeyUsage        = serverAuth, clientAuth

  # Section req_ext is used when generating a certificate signing request.
  [ req_ext ]
  subjectKeyIdentifier = hash
  basicConstraints     = CA:FALSE
  keyUsage             = digitalSignature, keyEncipherment
  subjectAltName       = @alternate_names
  nsComment            = "OpenSSL Generated Certificate"
  extendedKeyUsage     = serverAuth, clientAuth

  # add additional DNS options for the server hostname lookup
  [ alternate_names ]
  DNS.1 = ${hostname}
  DNS.2 = www.${hostname}
  DNS.3 = https://${hostname}
  DNS.4 = https://www.${hostname}
  DNS.5 = *.${hostname}
  `;

            fs.writeFileSync(`${_certDir}/${domainPrefix}.req`, configData, 'utf8');
            const exampleReq = fs.readFileSync(`${_certDir}/${domainPrefix}.req`).toString('utf-8');
            console.log(`Generated config file for: ${hostname} @ ${_certDir}/${domainPrefix}.req`);
            console.dir(exampleReq);
            return `${_certDir}/${domainPrefix}.req`;
        } catch (e) {
            console.error(e.message);
        }
    }

}

module.exports = {CertificateConfigFileFactory};
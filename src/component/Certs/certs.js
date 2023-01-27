import fs from 'fs';
// initialize SSL configuration using child process
import { exec } from "node:child_process";

class CertificateGenerator {
    constructor(options, hostname, certDir) {
        this.options = options;
        this.hostname = hostname;
        this.certsDir = certDir;
        this.run(this);
    }

    run() {
        if (arguments.length === 0 || arguments.length < 3) {
            console.log("Missing parameter 3.");
            console.log("Usage: $0 -s <domain> <cert dir>");
            console.log("Parameters passed: [${1}, ${2}, ${3}]");
            process.exit(1);
        }

        // create the cert directory if it doesn't exist
        if (!this.certsDir && !fs.existsSync(this.certsDir)) {
            console.log("Certificate directory not found. Creating from input: [$_CERTS_DIR]");
            fs.mkdirSync(this.certsDir);
        }

        switch (this.options) {
            case '-f' || '--file':
                console.log("Entry is a file.");
                this.hostname = fs.readFileSync(this.hostname).toString().split('=')[1].trim();

                if (!this.hostname) {
                    console.log("Configuration file error: hostname/commonname not defined.");
                    process.exit(1);
                }

                this.domain = this.hostname.split('.')[0];
                this.domainName = this.hostname;
                this.exampleReq = fs.readdirSync(this.domain + '.req');

                console.log("Hostname: " + this.hostname);
                console.log("Certificate Directory: " + this.certsDir);
                break;
            case '-s' || '--string':
                console.log("String domain/hostname provided: " + this.hostname);

                if (!this.hostname) {
                    console.log("Configuration file error: missing second input parameter [ /bin/bash ${0} -s <input value> ].");
                    process.exit(1);
                }

                this.domain = this.hostname.split('.')[0];
                this.domainName = this.hostname;
                this.exampleReq = fs.readdirSync(this.domain + '.req');

                console.log("Hostname: " + this.hostname);
                console.log("Certificate Directory: " + this.certsDir);
                console.log("Configuration file location: " + this.exampleReq);
                break;
            case '-d' || '--default':
                console.log("Defaulting to example.com hostname...");
                this.hostname = "example.com";
                this.domain = this.hostname.split('.')[0];
                this.domainName = this.hostname;
                this.exampleReq = fs.readdirSync(this.domain + '.req');

                console.log("Hostname: " + this.hostname);
                console.log("Certificate Directory: " + this.certsDir);
                console.log("Configuration file location: " + this.exampleReq);
                break;
            case '-c' || '--config':
                console.log("Configuration file found.");
                this.hostname = fs.readFileSync(this.hostname).toString().split('COMMONNAME')[2].trim();

                if (!this.hostname) {
                    console.log("Configuration file error: hostname/commonname not defined");
                    process.exit(1);
                }

                this.domain = this.hostname.split('.')[0];
                this.domainName = this.hostname;
                this.exampleReq = fs.readdirSync(this.domain + '.req');

                console.log("Hostname: " + this.hostname);
                console.log("Certificate Directory: " + this.certsDir);
                console.log("Configuration file location: " + this.exampleReq);
                break;
            default:
                console.log("HELP DOCS:");
                console.log("Usage:");
                console.log("/bin/bash ${0} [ -f file | -s string | -d  | -h | -c ] <certificate directory>");
                console.log("OPTIONS:");
                console.log("-f | --file: passing a file containing the hostname.");
                console.log("-s | --string: passing a string containing the hostname.");
                console.log("-d | --default: default hostname used is example.com, no second parameter should be entered.");
                console.log("-c | --config: config file to be used in certificate generation. If no config file is provided one will be created from hostname.");
                console.log("-h | --help: this help message.");
                process.exit(1);
                break;
        }
    }

    /**
     * Get Certificate Directory
     * @param {String} certReq
     * @param {String} domainPrefix
     * @param {String} hostname
     * @param {String} _certDir
     */
    getCertDir(certReq, domainPrefix, hostname, _certDir){
        try {
            // Check for the config file example.req
            if (!fs.existsSync(certReq) || !fs.existsSync(_certDir)) {
                this.generateConfig(domainPrefix, hostname, _certDir);
            } else {
                certReq = fs.readdirSync(_certDir).find(file => file.name === `${domainPrefix}.req`);
            }

            // Terminate script if config file not found
            if (!certReq) {
                console.log(`Config file "${domainPrefix}.req"] not found`);
                console.log(`Generating new config file for "${hostname}"`);
                // Now generate the config file
                this.generateConfig(domainPrefix, hostname, _certDir);
            }
        } catch (e) {
            console.error(e.message);
        }
    }

    /**
     * Generate Random Config File
     * @param {String} domainPrefix
     * @param {String} hostname
     * @param {String} _certDir
     */
    generateConfig(domainPrefix = null, hostname = null, _certDir = null) {
        try {
            // Exit if no .certs directory
            if (!_certDir) {
                console.log('Unable to locate ".certs directory".');
                console.log(`No directory at: "${this.certsDir}"`);
                process.exit(1);
            }

            console.log(`Generating config file for: ${this.hostname} @ ${_certDir}/${domainPrefix}.req`);

            // Else generate new config file with defined domain name
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

            let exampleReq = fs.readdirSync(_certDir).find(file => file.name === `${domainPrefix}.req`);
            let cnt = 0;
            while (!fs.existsSync(exampleReq)) {
                console.log('Waiting for config file creation...');
                cnt += 1;
                if (cnt > 3) {
                    console.log('Config file not found...');
                    break;
                }
                // Recurse the process tree looking for config file
                this.getCertDir(exampleReq, domainPrefix, hostname, _certDir);
            }
        } catch (e) {
            console.error(e.message);
        }


    }

    /**
     * Generate certificate key pair from the given {exampleReq} document and
     * {domain} name; Certificates will be generated in the {certsDir} and
     * @param certReq
     * @param certDir
     * @param domainPrefix
     */
    generateCert(certReq, certDir, domainPrefix) {
        const serverKeyFile = `${certDir}/${domainPrefix}.key.pem`;
        const certificateFile = `${certDir}/${domainPrefix}.x509.crt`;
        const fullChain = `${certDir}/${domainPrefix}.ca.pem`;
        const publicKeyFile = `${certDir}/${domainPrefix}.pub`;

        console.log(`Config file generated at: ${certReq}`);
        console.log(`Server Key File: ${serverKeyFile}`);
        console.log(`Certificate File: ${certificateFile}`);

        if (fs.existsSync(certReq)) {
            // create the certs key file
            const certOptions = [
                'req',
                '-config',
                certReq,
                '-new',
                '-nodes',
                '-x509',
                '-newkey',
                'rsa:2048',
                '-sha256',
                '-keyout',
                serverKeyFile,
                '-out',
                certificateFile,
                '-days',
                '3650',
            ];
            const cert = exec(`openssl ${certOptions}`);
            cert.on('exit', () => {
                // Then to combine things to get a .pem fullchain file:
                const fullChainOptions = [
                    'cat',
                    serverKeyFile,
                    certificateFile,
                    '>',
                    fullChain,
                ];
                const fullChainCmd = exec(`bash ${fullChainOptions}`);
                fullChainCmd.on('exit', () => {
                    // Then to extract the public key for use in validation:
                    const publicKeyOptions = [
                        'openssl',
                        'x509',
                        '-pubkey',
                        '-noout',
                        '-in',
                        fullChain,
                        '>',
                        publicKeyFile,
                    ];
                    const publicKeyCmd = exec(`bash ${publicKeyOptions}`);
                    publicKeyCmd.on('exit', () => {
                        // do something
                    });
                });
            });
        } else {
            console.log('No certificate request file found. Exiting......');
        }
    }
}
///////////////////////////////////////////////////////////////////////////////

const certGen = new CertificateGenerator()
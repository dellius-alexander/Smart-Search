const fs = require('fs');
const path = require('path');
const {CertificateConfigFileFactory} = require('./CertificateConfigFileFactory');
const { exec } = require('node:child_process');
class GenerateCertificate {
    constructor(domainPrefix, hostname, certsDir) {
        this.domainPrefix = domainPrefix || hostname.split('.')[1];
        this.hostname = hostname;
        this.certsDir = certsDir;
    }
    generateCertificate(
        hostname =  this.hostname || null,
        certsDir = this.certsDir || process.cwd(),
        domainPrefix = this.domainPrefix || null
    ) {
        // create the cert directory if it doesn't exist
        if (certsDir && !fs.existsSync(certsDir)) {
            console.log('Certificate directory not found. Creating from input: [$_CERTS_DIR]');
            fs.mkdirSync(certsDir || '.');
        }
        let certificateConfigFile = `${certsDir}/${domainPrefix}.req`
        if (!fs.existsSync(certificateConfigFile)) {
            // Generate config file
            certificateConfigFile = CertificateConfigFileFactory
                .create(domainPrefix, hostname, certsDir)
                .generateConfig();
        }

        console.log('Certificate Config File: ' + certificateConfigFile);
        console.log('Certificate Directory: ' + certsDir);

        // Generate certificate
        // Create an X509 certificate from the config
        return this.generateCert(certificateConfigFile, certsDir, domainPrefix);

    }

    /**
     * Generate certificate key pair from the given {exampleReq} document and
     * {domain} name; Certificates will be generated in the {certsDir} and
     * @param certificateConfigFile
     * @param certsDir
     * @param domainPrefix
     * @return {Array} a list of certificate files generated
     */
    generateCert(certificateConfigFile, certsDir, domainPrefix) {
        const serverKeyFile = `${certsDir}/${domainPrefix}.key`;
        const certificateFile = `${certsDir}/${domainPrefix}.crt`;
        const fullChain = `${certsDir}/${domainPrefix}.pem`;
        const publicKeyFile = `${certsDir}/${domainPrefix}.pub`;
        let fileList = null;

        console.log(`Config file generated at: ${certsDir}/${domainPrefix}.req`);
        console.log(`Server Key File: ${serverKeyFile}`);
        console.log(`Certificate File: ${certificateFile}`);

        if (fs.existsSync(`${certsDir}/${domainPrefix}.req`)) {
            // create the certs key file
            const certOptions =
                `openssl \
                req  \
                -config \
                ${certificateConfigFile} \
                -new \
                -nodes \
                -x509 \
                -newkey \
                rsa:2048 \
                -sha256 \
                -keyout \
                ${serverKeyFile} \
                -out \
                ${certificateFile} \
                -days \
                3650`;

            const cert = exec(certOptions);

            cert.on('exit', async () => {
                // Then to combine things to get a .pem fullchain file:
                const fullChainOptions =
                    `cat ${serverKeyFile} \
                    ${certificateFile} \
                    > \
                    ${fullChain}`;
                const fullChainCmd = await exec(fullChainOptions);
                fullChainCmd.on('exit', async () => {
                    // Then to extract the public key for use in validation:
                    const publicKeyOptions =
                        `openssl \
                        x509 \
                        -pubkey \
                        -noout \
                        -in \
                        ${fullChain} \
                        > \
                        ${publicKeyFile}`;
                    const publicKeyCmd = exec(publicKeyOptions);
                    publicKeyCmd.on('exit', async () => {
                        // Get and return the list of generated files
                        fileList = await this.walkSync(certsDir);
                        console.log(fileList);
                    });
                });
            });

        } else {
            console.log('No certificate request file found. Exiting......');
        }
    }
    // List all files in a directory in Node.js recursively in a synchronous fashion
    async walkSync(dir, filelist = []){
        fs.readdirSync(dir).forEach(file => {
            filelist = fs.statSync(path.join(dir, file)).isDirectory()
                ? this.walkSync(path.join(dir, file), filelist)
                : filelist.concat(path.join(dir, file));
        });
        return filelist;
    }

}


module.exports = {GenerateCertificate};
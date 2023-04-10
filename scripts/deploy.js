const { ethers, run, network } = require("hardhat")
const prompt = require("prompt-sync")()

async function main() {
    //Contract Deployment
    console.log("Contract Deployment!~\n")
    console.log("Deploying contract!!")
    const contractFactory = await ethers.getContractFactory("SimpleStorage")
    const simpleStorage = await contractFactory.deploy()
    console.log(`Contract Successfully Deployed at: ${simpleStorage.address}`)

    //Using Contract
    let retrieve = await simpleStorage.retrieve()
    console.log(`Number: ${retrieve}`)
    const prompt1 = parseInt(prompt("Enter Number You Want To Store: "))
    const store = await simpleStorage.store(prompt1)
    let transactionResponse = await store.wait()
    const updatedRetrieve = await simpleStorage.retrieve()
    console.log(`Updated Number: ${updatedRetrieve}`)

    //Verify
    console.log("\nVerification~\n")
    if (network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log(`Verifying Contract on: ${network.name}`)
        const contractAddress = simpleStorage.address
        await verify(contractAddress, [])
    } else {
        console.log("Local Host Detected! Verification Declined X")
    }
}

const verify = async (contractAddress, args) => {
    try {
        await run("verify:verify", {
            address: contractAddress,
            transactionArgs: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Contract is Already verified")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

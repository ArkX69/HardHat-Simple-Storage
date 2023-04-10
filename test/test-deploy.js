const { assert, expect } = require("chai")

describe("Simple Storage", () => {
    let contractFactory
    let simpleStorage

    beforeEach(async function () {
        //Contract Deployment
        contractFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await contractFactory.deploy()
    })

    it("Base value should be 0", async () => {
        const baseValue = "0"
        const retrieve = await simpleStorage.retrieve()

        assert.equal(baseValue, retrieve.toString())
    })

    it("Should update to 7", async () => {
        const favouriteNumber = "7"
        const store = await simpleStorage.store(favouriteNumber)
        const expectedValue = await simpleStorage.retrieve()

        assert.equal(favouriteNumber, expectedValue.toString())
    })

    it("People array should update", async () => {
        const expectedPersonName = "Harry"
        const expectedFavouriteNumber = "7"
        const transactionResponse = await simpleStorage.addPerson(
            expectedPersonName,
            expectedFavouriteNumber
        )

        await transactionResponse.wait(1)
        const { favoriteNumber, name } = await simpleStorage.people(0)

        assert.equal(name, expectedPersonName)
        assert.equal(favoriteNumber, expectedFavouriteNumber)

        // const expectedPersonName = "Patrick"
        // const expectedFavoriteNumber = "16"
        // const transactionResponse = await simpleStorage.addPerson(
        //     expectedPersonName,
        //     expectedFavoriteNumber
        // )
        // await transactionResponse.wait(1)
        // const { favoriteNumber, name } = await simpleStorage.people(0)

        // assert.equal(name, expectedPersonName)
        // assert.equal(favoriteNumber, expectedFavoriteNumber)
    })
})

const Organization = require('../model/organization.model');

async function getOrganization() {
    try {
        let orgData = await Organization.find({})
        console.log(orgData)
        return orgData
    } catch (error) {
        console.log(error)
    }
}

async function addOrganization(data) {
    try {
        let orgModel = new Organization(data)
        let orgData = await orgModel.save(data)
        console.log(orgData)
        return orgData
    } catch (error) {
        console.log(error)
    }
}

async function updateOrganization(CatId, category) {
    try {
        let response = await Organization.updateOne({ _id: CatId }, category )
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteOrganization(catId) {
    try {
        let res = await Organization.remove({ _id: catId })
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getOrganization,
    addOrganization,
    updateOrganization,
    deleteOrganization
}
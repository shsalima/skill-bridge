import Formation from "../models/Formation.js";


export const createFormationService=async(candidatId,formationData)=>{
   return await Formation.create({
        candidat:candidatId,
        ...formationData,  
   })
}

export const getMyFormationsService=async(candidatId)=>{
    return await Formation.find({candidat:candidatId}).sort({dateDebut:-1})
}


export const deleteFormationService=async(formationId,candidatId)=>{
    const formation=await Formation.findById(formationId)

    if(!formation){
        throw new Error("Formation non trouvée")
    }

    if(formation.candidat.toString()!==candidatId){
        throw new Error("Vous n'êtes pas autorisé à supprimer cette formation")
    }

    await formation.deleteOne()
    return formation

}
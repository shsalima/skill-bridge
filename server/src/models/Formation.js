

const formationSchema = new mongoose.Schema(
    {
        candidat:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        diplome:{
            type:String,
            required:true,
            trim:true
        },
        etablissement:{
            type:String,
            required:true,
            trim:true
        },
        specialite:{
            type:String,
            required:true,
            trim:true
        },
        dateDebut:{
            type:Date,
            required:true,
        },
        dateFin:{
            type:Date,
            required:true,      
        }
    },
    {timestamps:true}
)

export default mongoose.model("Formation",formationSchema)
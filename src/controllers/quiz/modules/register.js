module.exports = async (req, res) => {
    try {
        verifyData(req.body);


        const user = await prisma.user.upsert({
            where: {
                phone: req.body.phone,
            },
            update: {
                name: req.body.name,
                email: req.body.email,
                companyName: req.body.companyName,
                companySegment: req.body.companySegment,
                companySize: req.body.companySize
            },
            create: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                companyName: req.body.companyName,
                companySegment: req.body.companySegment,
                companySize: req.body.companySize,
                ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                userAgent: req.headers['user-agent'] || "Desconhecido"
            },
        })

        const prevAnswer = await prisma.answer.findFirst({

            where: { User: { id: user.id } }
        })

        if (prevAnswer) {
            await prisma.answer.update({

                where: { id: prevAnswer.id },
                data: { response: req.body.Answers },

            })

        } else {

            await prisma.answer.create({

                data: { response: req.body.Answers, User:{connect:{id:user.id}} },

            })

        }


        res.json({

            user

        });



    } catch (e) {
        let status = e.status || 500;
        let message = e.message || "Internal Server Error";
        console.log(e);

        delete e.status;
        delete e.message;

        res.status(status).json({ success: false, message: message, error: e });
    }
};

const verifyData = (body) => {
    if (!body.name) throw { status: 400, message: "Nome é obrigatório!" };
    if (!body.phone) throw { status: 400, message: "Telefone é obrigatório!" };
    if (!body.companyName) throw { status: 400, message: " Nome da Empresa é Obrigatório!" };
    if (!body.companySegment) throw { status: 400, message: " Segmento da Empresa é Obrigatório!" };
    if (!body.companySize) throw { status: 400, message: "Tamanho da Empresa é Obrigatório!" };
    if (!body.Answers) throw { status: 400, message: " Resposta Obrigatória!" };

}
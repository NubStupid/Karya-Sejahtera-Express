import connectMongoDB from "../../../../database/connectDB";
import Users from "../../../../models/Users";
import bcrypt from "bcrypt";
import Joi from "joi";

export async function POST(req) {
    await connectMongoDB();

    const { username, name, email, phone, address, profilePic, password } = await req.json();

    const schema = Joi.object({
        username: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required().messages({
            "string.email": "Email tidak valid.",
            "any.required": "Email harus diisi."
        }),
        phone: Joi.string().pattern(/^[0-9]+$/).required().messages({
            "string.pattern.base": "Nomor telepon hanya boleh mengandung angka.",
            "any.required": "Nomor telepon harus diisi."
        }),
        address: Joi.string().min(10).required().messages({
            "string.min": "Alamat harus memiliki minimal 10 karakter.",
            "any.required": "Alamat harus diisi."
        }),
        profilePic: Joi.string().uri().required().messages({
            "string.uri": "URL gambar tidak valid.",
            "any.required": "Foto profil harus diisi."
        }),
        password: Joi.string().min(6).optional().allow(null, '').messages({
            "string.min": "Password harus memiliki minimal 6 karakter."
        })
    });

    const { error } = schema.validate({ username, name, email, phone, address, profilePic, password });
    if (error) {
        return new Response(
            JSON.stringify({ errors: { message: error.details[0].message } }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    let hashedPassword = null;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    try {
        const updateData = {
            "profile.name": name,
            "profile.email": email,
            "profile.phone": phone,
            "profile.address": address,
            "profile.profpic": profilePic,
        };
        if (hashedPassword) {
            updateData.password = hashedPassword;
        }

        const updatedUser = await Users.findOneAndUpdate(
            { username },
            { $set: updateData },
            { new: true }
        );

        if (!updatedUser) {
            return new Response(JSON.stringify({ errors: { message: "Pengguna tidak ditemukan." } }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "Profil pengguna berhasil diperbarui." }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ errors: { message: "Gagal memperbarui data pengguna." } }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

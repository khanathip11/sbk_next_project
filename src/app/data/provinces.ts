import { Province } from "../types/provinceOptions";

export const provinces: Province[] = [
    {
        value: "bangkok",
        label: "กรุงเทพมหานคร",
        districts: [
            {
                value: "pathumwan",
                label: "เขตปทุมวัน",
                subdistricts: [
                    { value: "lumphini", label: "แขวงลุมพินี" },
                    { value: "wangmai", label: "แขวงวังใหม่" },
                ],
            },
            {
                value: "dusit",
                label: "เขตดุสิต",
                subdistricts: [
                    { value: "si-yan", label: "แขวงศรีย่าน" },
                    { value: "wat-sommanat", label: "แขวงวัดโสมมนัส" },
                ],
            },
        ],
    },
    {
        value: "nonthaburi",
        label: "นนทบุรี",
        districts: [
            {
                value: "mueang-nonthaburi",
                label: "อำเภอเมืองนนทบุรี",
                subdistricts: [
                    { value: "bang-kraso", label: "ตำบลบางกระสอ" },
                    { value: "talat-khwan", label: "ตำบลตลาดขวัญ" },
                ],
            },
            {
                value: "bang-yai",
                label: "อำเภอบางใหญ่",
                subdistricts: [
                    { value: "bang-mueng", label: "ตำบลบางม่วง" },
                    { value: "bang-yai", label: "ตำบลบางใหญ่" },
                ],
            },
        ],
    },
    {
        value: "pathumthani",
        label: "ปทุมธานี",
        districts: [
            {
                value: "mueang-pathumthani",
                label: "อำเภอเมืองปทุมธานี",
                subdistricts: [
                    { value: "bang-parok", label: "ตำบลบางปรอก" },
                    { value: "bang-ku-wat", label: "ตำบลบางคูวัด" },
                ],
            },
            {
                value: "thanyaburi",
                label: "อำเภอธัญบุรี",
                subdistricts: [
                    { value: "prachatipat", label: "ตำบลประชาธิปัตย์" },
                    { value: "rangsit", label: "ตำบลรังสิต" },
                ],
            },
        ],
    },
    {
        value: "samutprakan",
        label: "สมุทรปราการ",
        districts: [
            {
                value: "mueang-samutprakan",
                label: "อำเภอเมืองสมุทรปราการ",
                subdistricts: [
                    { value: "paknam", label: "ตำบลปากน้ำ" },
                    { value: "bang-mueang", label: "ตำบลบางเมือง" },
                ],
            },
            {
                value: "bang-phli",
                label: "อำเภอบางพลี",
                subdistricts: [
                    { value: "bang-phli-yai", label: "ตำบลบางพลีใหญ่" },
                    { value: "raja-thewa", label: "ตำบลราชาเทวะ" },
                ],
            },
        ],
    },
    {
        value: "samut-sakhon",
        label: "สมุทรสาคร",
        districts: [
            {
                value: "mueang-samut-sakhon",
                label: "อำเภอเมืองสมุทรสาคร",
                subdistricts: [
                    { value: "maha-chai", label: "ตำบลมหาชัย" },
                    { value: "ban-phaeo", label: "ตำบลบ้านแพ้ว" },
                ],
            },
        ],
    },
    {
        value: "nakhon-pathom",
        label: "นครปฐม",
        districts: [
            {
                value: "mueang-nakhon-pathom",
                label: "อำเภอเมืองนครปฐม",
                subdistricts: [
                    { value: "phra-pathom", label: "ตำบลพระปฐมเจดีย์" },
                    { value: "dong-yai", label: "ตำบลดงใหญ่" },
                ],
            },
            {
                value: "salaya",
                label: "อำเภอศาลายา",
                subdistricts: [
                    { value: "salaya", label: "ตำบลศาลายา" },
                    { value: "maha-sawat", label: "ตำบลมหาสวัสดิ์" },
                ],
            },
        ],
    },
];

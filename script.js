const searchInput = document.getElementById("searchKota")
const kotaList = document.getElementById("kotaList")
const jadwalBody = document.getElementById("jadwalBody")
const loading = document.getElementById("loading")
const error = document.getElementById("error")

let semuaKota = []

const tahun = new Date().getFullYear()
const bulan = new Date().getMonth() + 1


async function loadKota(){

const res = await fetch("https://api.myquran.com/v2/sholat/kota/semua")
const data = await res.json()

semuaKota = data.data

}

loadKota()


searchInput.addEventListener("input", function(){

const keyword = this.value.toLowerCase()

kotaList.innerHTML = ""

if(keyword.length === 0){
kotaList.classList.add("hidden")
return
}

const hasil = semuaKota.filter(kota =>
kota.lokasi.toLowerCase().includes(keyword)
)

hasil.slice(0,20).forEach(kota => {

const li = document.createElement("li")

li.textContent = kota.lokasi

li.className =
"p-3 hover:bg-emerald-100 cursor-pointer"

li.onclick = () => {

searchInput.value = kota.lokasi
kotaList.classList.add("hidden")

getJadwal(kota.id)

}

kotaList.appendChild(li)

})

kotaList.classList.remove("hidden")

})


async function getJadwal(id){

loading.classList.remove("hidden")
error.classList.add("hidden")

try{

const res = await fetch(`https://api.myquran.com/v2/sholat/jadwal/${id}/${tahun}/${bulan}`)
const data = await res.json()

renderTable(data.data.jadwal)

}catch{

error.classList.remove("hidden")

}

loading.classList.add("hidden")

}


function renderTable(jadwal){

jadwalBody.innerHTML = ""

const today = new Date().toISOString().split("T")[0]

jadwal.forEach(item => {

const isToday = item.date === today

const row = document.createElement("tr")

row.className =
`hover:bg-emerald-50
${isToday ? "bg-emerald-200 font-semibold" : ""}`

row.innerHTML = `
<td class="p-3">${item.tanggal}</td>
<td class="p-3">${item.imsak}</td>
<td class="p-3">${item.subuh}</td>
<td class="p-3">${item.dzuhur}</td>
<td class="p-3">${item.ashar}</td>
<td class="p-3">${item.maghrib}</td>
<td class="p-3">${item.isya}</td>
`

jadwalBody.appendChild(row)

})

}
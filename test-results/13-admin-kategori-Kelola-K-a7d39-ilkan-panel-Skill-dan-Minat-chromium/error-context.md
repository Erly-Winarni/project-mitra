# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 13-admin-kategori.spec.js >> Kelola Kategori (tampilan) >> menampilkan panel Skill dan Minat
- Location: tests\13-admin-kategori.spec.js:20:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Kategori Skill' })
Expected: visible
Error: strict mode violation: getByRole('heading', { name: 'Kategori Skill' }) resolved to 2 elements:
    1) <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Kelola Kategori Skill/Minat</h1> aka getByRole('heading', { name: 'Kelola Kategori Skill/Minat' })
    2) <h2 class="text-base font-bold text-slate-900">Kategori Skill</h2> aka getByRole('heading', { name: 'Kategori Skill', exact: true })

Call log:
  - Expect "toBeVisible" getByRole('heading', { name: 'Kategori Skill' }) with timeout 10000ms
  - waiting for getByRole('heading', { name: 'Kategori Skill' })

```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - generic [ref=f1e2]:
    - complementary [ref=f1e3]:
      - generic [ref=f1e4]:
        - generic [ref=f1e14]:
          - generic [ref=f1e15]:
            - generic [ref=f1e16]: SkillMatch
            - generic [ref=f1e17]: Admin
          - paragraph [ref=f1e18]: Campus Platform
        - navigation [ref=f1e19]:
          - link "Dashboard Admin" [ref=f1e20] [cursor=pointer]:
            - /url: /admin
          - link "Verifikasi Akun" [ref=f1e27] [cursor=pointer]:
            - /url: /admin/verifikasi
          - link "Kelola Kategori Skill/Minat" [ref=f1e31] [cursor=pointer]:
            - /url: /admin/kategori
          - link "Pantau Statistik Penggunaan" [ref=f1e37] [cursor=pointer]:
            - /url: /admin/statistik
    - main [ref=f1e41]:
      - generic [ref=f1e42]:
        - generic [ref=f1e43]: Panel Kelola Kampus
        - button "Administrator expand_more admin@kampus.ac.id" [ref=f1e46] [cursor=pointer]:
          - generic [ref=f1e50]:
            - generic [ref=f1e51]:
              - generic [ref=f1e52]: Administrator
              - generic [ref=f1e53]: expand_more
            - generic [ref=f1e54]: admin@kampus.ac.id
      - generic [ref=f1e55]:
        - generic [ref=f1e56]:
          - generic [ref=f1e57]:
            - heading "Kelola Kategori Skill/Minat" [level=1] [ref=f1e58]
            - generic [ref=f1e59]: Total 61 Kategori Terdaftar
          - paragraph [ref=f1e60]: Atur taksonomi keahlian dan minat mahasiswa untuk mendukung akurasi algoritma pencocokan SkillMatch.
        - generic [ref=f1e61]:
          - generic [ref=f1e62]:
            - generic [ref=f1e63]:
              - paragraph [ref=f1e64]: Total Kategori
              - generic [ref=f1e65]:
                - generic [ref=f1e66]: "61"
                - generic [ref=f1e67]: Kategori
              - paragraph [ref=f1e68]: Aktif di mesin pencocokan
            - generic [ref=f1e69]: category
          - generic [ref=f1e71]:
            - generic [ref=f1e72]:
              - paragraph [ref=f1e73]: Kategori Skill
              - generic [ref=f1e74]:
                - generic [ref=f1e75]: "46"
                - generic [ref=f1e76]: Skill
              - paragraph [ref=f1e77]: Basis hard skills tim
            - generic [ref=f1e78]: code
          - generic [ref=f1e80]:
            - generic [ref=f1e81]:
              - paragraph [ref=f1e82]: Kategori Minat
              - generic [ref=f1e83]:
                - generic [ref=f1e84]: "15"
                - generic [ref=f1e85]: Minat
              - paragraph [ref=f1e86]: Preferensi aspirasi mahasiswa
            - generic [ref=f1e87]: interests
        - generic [ref=f1e89]:
          - generic [ref=f1e90]:
            - generic [ref=f1e91]:
              - generic [ref=f1e92]:
                - generic [ref=f1e93]:
                  - generic [ref=f1e94]: explore
                  - generic [ref=f1e96]:
                    - generic [ref=f1e97]:
                      - heading "Kategori Skill" [level=2] [ref=f1e98]
                      - generic [ref=f1e99]: "46"
                    - paragraph [ref=f1e100]: Daftar skill yang diverifikasi & dipetakan pada profil peserta.
                - button "add Tambah Skill" [ref=f1e101] [cursor=pointer]:
                  - generic [ref=f1e102]: add
                  - generic [ref=f1e103]: Tambah Skill
              - generic [ref=f1e104]:
                - generic: search
                - textbox "Cari nama skill atau kategori..." [ref=f1e105]
              - generic [ref=f1e106]:
                - generic [ref=f1e107]:
                  - generic [ref=f1e108]:
                    - generic [ref=f1e110]: SKILL
                    - generic "UI Design" [ref=f1e111]
                  - generic [ref=f1e112]:
                    - button "edit Ubah" [ref=f1e113] [cursor=pointer]:
                      - generic [ref=f1e114]: edit
                      - generic [ref=f1e115]: Ubah
                    - button "delete Hapus" [ref=f1e116] [cursor=pointer]:
                      - generic [ref=f1e117]: delete
                      - generic [ref=f1e118]: Hapus
                - generic [ref=f1e119]:
                  - generic [ref=f1e120]:
                    - generic [ref=f1e122]: SKILL
                    - generic "React" [ref=f1e123]
                  - generic [ref=f1e124]:
                    - button "edit Ubah" [ref=f1e125] [cursor=pointer]:
                      - generic [ref=f1e126]: edit
                      - generic [ref=f1e127]: Ubah
                    - button "delete Hapus" [ref=f1e128] [cursor=pointer]:
                      - generic [ref=f1e129]: delete
                      - generic [ref=f1e130]: Hapus
                - generic [ref=f1e131]:
                  - generic [ref=f1e132]:
                    - generic [ref=f1e134]: SKILL
                    - generic "Next.js" [ref=f1e135]
                  - generic [ref=f1e136]:
                    - button "edit Ubah" [ref=f1e137] [cursor=pointer]:
                      - generic [ref=f1e138]: edit
                      - generic [ref=f1e139]: Ubah
                    - button "delete Hapus" [ref=f1e140] [cursor=pointer]:
                      - generic [ref=f1e141]: delete
                      - generic [ref=f1e142]: Hapus
                - generic [ref=f1e143]:
                  - generic [ref=f1e144]:
                    - generic [ref=f1e146]: SKILL
                    - generic "Vue.js" [ref=f1e147]
                  - generic [ref=f1e148]:
                    - button "edit Ubah" [ref=f1e149] [cursor=pointer]:
                      - generic [ref=f1e150]: edit
                      - generic [ref=f1e151]: Ubah
                    - button "delete Hapus" [ref=f1e152] [cursor=pointer]:
                      - generic [ref=f1e153]: delete
                      - generic [ref=f1e154]: Hapus
                - generic [ref=f1e155]:
                  - generic [ref=f1e156]:
                    - generic [ref=f1e158]: SKILL
                    - generic "Tailwind CSS" [ref=f1e159]
                  - generic [ref=f1e160]:
                    - button "edit Ubah" [ref=f1e161] [cursor=pointer]:
                      - generic [ref=f1e162]: edit
                      - generic [ref=f1e163]: Ubah
                    - button "delete Hapus" [ref=f1e164] [cursor=pointer]:
                      - generic [ref=f1e165]: delete
                      - generic [ref=f1e166]: Hapus
                - generic [ref=f1e167]:
                  - generic [ref=f1e168]:
                    - generic [ref=f1e170]: SKILL
                    - generic "TypeScript" [ref=f1e171]
                  - generic [ref=f1e172]:
                    - button "edit Ubah" [ref=f1e173] [cursor=pointer]:
                      - generic [ref=f1e174]: edit
                      - generic [ref=f1e175]: Ubah
                    - button "delete Hapus" [ref=f1e176] [cursor=pointer]:
                      - generic [ref=f1e177]: delete
                      - generic [ref=f1e178]: Hapus
                - generic [ref=f1e179]:
                  - generic [ref=f1e180]:
                    - generic [ref=f1e182]: SKILL
                    - generic "JavaScript" [ref=f1e183]
                  - generic [ref=f1e184]:
                    - button "edit Ubah" [ref=f1e185] [cursor=pointer]:
                      - generic [ref=f1e186]: edit
                      - generic [ref=f1e187]: Ubah
                    - button "delete Hapus" [ref=f1e188] [cursor=pointer]:
                      - generic [ref=f1e189]: delete
                      - generic [ref=f1e190]: Hapus
                - generic [ref=f1e191]:
                  - generic [ref=f1e192]:
                    - generic [ref=f1e194]: SKILL
                    - generic "HTML & CSS" [ref=f1e195]
                  - generic [ref=f1e196]:
                    - button "edit Ubah" [ref=f1e197] [cursor=pointer]:
                      - generic [ref=f1e198]: edit
                      - generic [ref=f1e199]: Ubah
                    - button "delete Hapus" [ref=f1e200] [cursor=pointer]:
                      - generic [ref=f1e201]: delete
                      - generic [ref=f1e202]: Hapus
                - generic [ref=f1e203]:
                  - generic [ref=f1e204]:
                    - generic [ref=f1e206]: SKILL
                    - generic "Node.js" [ref=f1e207]
                  - generic [ref=f1e208]:
                    - button "edit Ubah" [ref=f1e209] [cursor=pointer]:
                      - generic [ref=f1e210]: edit
                      - generic [ref=f1e211]: Ubah
                    - button "delete Hapus" [ref=f1e212] [cursor=pointer]:
                      - generic [ref=f1e213]: delete
                      - generic [ref=f1e214]: Hapus
                - generic [ref=f1e215]:
                  - generic [ref=f1e216]:
                    - generic [ref=f1e218]: SKILL
                    - generic "Express.js" [ref=f1e219]
                  - generic [ref=f1e220]:
                    - button "edit Ubah" [ref=f1e221] [cursor=pointer]:
                      - generic [ref=f1e222]: edit
                      - generic [ref=f1e223]: Ubah
                    - button "delete Hapus" [ref=f1e224] [cursor=pointer]:
                      - generic [ref=f1e225]: delete
                      - generic [ref=f1e226]: Hapus
                - generic [ref=f1e227]:
                  - generic [ref=f1e228]:
                    - generic [ref=f1e230]: SKILL
                    - generic "Python" [ref=f1e231]
                  - generic [ref=f1e232]:
                    - button "edit Ubah" [ref=f1e233] [cursor=pointer]:
                      - generic [ref=f1e234]: edit
                      - generic [ref=f1e235]: Ubah
                    - button "delete Hapus" [ref=f1e236] [cursor=pointer]:
                      - generic [ref=f1e237]: delete
                      - generic [ref=f1e238]: Hapus
                - generic [ref=f1e239]:
                  - generic [ref=f1e240]:
                    - generic [ref=f1e242]: SKILL
                    - generic "FastAPI" [ref=f1e243]
                  - generic [ref=f1e244]:
                    - button "edit Ubah" [ref=f1e245] [cursor=pointer]:
                      - generic [ref=f1e246]: edit
                      - generic [ref=f1e247]: Ubah
                    - button "delete Hapus" [ref=f1e248] [cursor=pointer]:
                      - generic [ref=f1e249]: delete
                      - generic [ref=f1e250]: Hapus
                - generic [ref=f1e251]:
                  - generic [ref=f1e252]:
                    - generic [ref=f1e254]: SKILL
                    - generic "Django" [ref=f1e255]
                  - generic [ref=f1e256]:
                    - button "edit Ubah" [ref=f1e257] [cursor=pointer]:
                      - generic [ref=f1e258]: edit
                      - generic [ref=f1e259]: Ubah
                    - button "delete Hapus" [ref=f1e260] [cursor=pointer]:
                      - generic [ref=f1e261]: delete
                      - generic [ref=f1e262]: Hapus
                - generic [ref=f1e263]:
                  - generic [ref=f1e264]:
                    - generic [ref=f1e266]: SKILL
                    - generic "PHP" [ref=f1e267]
                  - generic [ref=f1e268]:
                    - button "edit Ubah" [ref=f1e269] [cursor=pointer]:
                      - generic [ref=f1e270]: edit
                      - generic [ref=f1e271]: Ubah
                    - button "delete Hapus" [ref=f1e272] [cursor=pointer]:
                      - generic [ref=f1e273]: delete
                      - generic [ref=f1e274]: Hapus
                - generic [ref=f1e275]:
                  - generic [ref=f1e276]:
                    - generic [ref=f1e278]: SKILL
                    - generic "Laravel" [ref=f1e279]
                  - generic [ref=f1e280]:
                    - button "edit Ubah" [ref=f1e281] [cursor=pointer]:
                      - generic [ref=f1e282]: edit
                      - generic [ref=f1e283]: Ubah
                    - button "delete Hapus" [ref=f1e284] [cursor=pointer]:
                      - generic [ref=f1e285]: delete
                      - generic [ref=f1e286]: Hapus
                - generic [ref=f1e287]:
                  - generic [ref=f1e288]:
                    - generic [ref=f1e290]: SKILL
                    - generic "Golang" [ref=f1e291]
                  - generic [ref=f1e292]:
                    - button "edit Ubah" [ref=f1e293] [cursor=pointer]:
                      - generic [ref=f1e294]: edit
                      - generic [ref=f1e295]: Ubah
                    - button "delete Hapus" [ref=f1e296] [cursor=pointer]:
                      - generic [ref=f1e297]: delete
                      - generic [ref=f1e298]: Hapus
                - generic [ref=f1e299]:
                  - generic [ref=f1e300]:
                    - generic [ref=f1e302]: SKILL
                    - generic "Java" [ref=f1e303]
                  - generic [ref=f1e304]:
                    - button "edit Ubah" [ref=f1e305] [cursor=pointer]:
                      - generic [ref=f1e306]: edit
                      - generic [ref=f1e307]: Ubah
                    - button "delete Hapus" [ref=f1e308] [cursor=pointer]:
                      - generic [ref=f1e309]: delete
                      - generic [ref=f1e310]: Hapus
                - generic [ref=f1e311]:
                  - generic [ref=f1e312]:
                    - generic [ref=f1e314]: SKILL
                    - generic "Spring Boot" [ref=f1e315]
                  - generic [ref=f1e316]:
                    - button "edit Ubah" [ref=f1e317] [cursor=pointer]:
                      - generic [ref=f1e318]: edit
                      - generic [ref=f1e319]: Ubah
                    - button "delete Hapus" [ref=f1e320] [cursor=pointer]:
                      - generic [ref=f1e321]: delete
                      - generic [ref=f1e322]: Hapus
                - generic [ref=f1e323]:
                  - generic [ref=f1e324]:
                    - generic [ref=f1e326]: SKILL
                    - generic "PostgreSQL" [ref=f1e327]
                  - generic [ref=f1e328]:
                    - button "edit Ubah" [ref=f1e329] [cursor=pointer]:
                      - generic [ref=f1e330]: edit
                      - generic [ref=f1e331]: Ubah
                    - button "delete Hapus" [ref=f1e332] [cursor=pointer]:
                      - generic [ref=f1e333]: delete
                      - generic [ref=f1e334]: Hapus
                - generic [ref=f1e335]:
                  - generic [ref=f1e336]:
                    - generic [ref=f1e338]: SKILL
                    - generic "MySQL" [ref=f1e339]
                  - generic [ref=f1e340]:
                    - button "edit Ubah" [ref=f1e341] [cursor=pointer]:
                      - generic [ref=f1e342]: edit
                      - generic [ref=f1e343]: Ubah
                    - button "delete Hapus" [ref=f1e344] [cursor=pointer]:
                      - generic [ref=f1e345]: delete
                      - generic [ref=f1e346]: Hapus
                - generic [ref=f1e347]:
                  - generic [ref=f1e348]:
                    - generic [ref=f1e350]: SKILL
                    - generic "MongoDB" [ref=f1e351]
                  - generic [ref=f1e352]:
                    - button "edit Ubah" [ref=f1e353] [cursor=pointer]:
                      - generic [ref=f1e354]: edit
                      - generic [ref=f1e355]: Ubah
                    - button "delete Hapus" [ref=f1e356] [cursor=pointer]:
                      - generic [ref=f1e357]: delete
                      - generic [ref=f1e358]: Hapus
                - generic [ref=f1e359]:
                  - generic [ref=f1e360]:
                    - generic [ref=f1e362]: SKILL
                    - generic "Redis" [ref=f1e363]
                  - generic [ref=f1e364]:
                    - button "edit Ubah" [ref=f1e365] [cursor=pointer]:
                      - generic [ref=f1e366]: edit
                      - generic [ref=f1e367]: Ubah
                    - button "delete Hapus" [ref=f1e368] [cursor=pointer]:
                      - generic [ref=f1e369]: delete
                      - generic [ref=f1e370]: Hapus
                - generic [ref=f1e371]:
                  - generic [ref=f1e372]:
                    - generic [ref=f1e374]: SKILL
                    - generic "Prisma ORM" [ref=f1e375]
                  - generic [ref=f1e376]:
                    - button "edit Ubah" [ref=f1e377] [cursor=pointer]:
                      - generic [ref=f1e378]: edit
                      - generic [ref=f1e379]: Ubah
                    - button "delete Hapus" [ref=f1e380] [cursor=pointer]:
                      - generic [ref=f1e381]: delete
                      - generic [ref=f1e382]: Hapus
                - generic [ref=f1e383]:
                  - generic [ref=f1e384]:
                    - generic [ref=f1e386]: SKILL
                    - generic "Flutter" [ref=f1e387]
                  - generic [ref=f1e388]:
                    - button "edit Ubah" [ref=f1e389] [cursor=pointer]:
                      - generic [ref=f1e390]: edit
                      - generic [ref=f1e391]: Ubah
                    - button "delete Hapus" [ref=f1e392] [cursor=pointer]:
                      - generic [ref=f1e393]: delete
                      - generic [ref=f1e394]: Hapus
                - generic [ref=f1e395]:
                  - generic [ref=f1e396]:
                    - generic [ref=f1e398]: SKILL
                    - generic "React Native" [ref=f1e399]
                  - generic [ref=f1e400]:
                    - button "edit Ubah" [ref=f1e401] [cursor=pointer]:
                      - generic [ref=f1e402]: edit
                      - generic [ref=f1e403]: Ubah
                    - button "delete Hapus" [ref=f1e404] [cursor=pointer]:
                      - generic [ref=f1e405]: delete
                      - generic [ref=f1e406]: Hapus
                - generic [ref=f1e407]:
                  - generic [ref=f1e408]:
                    - generic [ref=f1e410]: SKILL
                    - generic "Kotlin" [ref=f1e411]
                  - generic [ref=f1e412]:
                    - button "edit Ubah" [ref=f1e413] [cursor=pointer]:
                      - generic [ref=f1e414]: edit
                      - generic [ref=f1e415]: Ubah
                    - button "delete Hapus" [ref=f1e416] [cursor=pointer]:
                      - generic [ref=f1e417]: delete
                      - generic [ref=f1e418]: Hapus
                - generic [ref=f1e419]:
                  - generic [ref=f1e420]:
                    - generic [ref=f1e422]: SKILL
                    - generic "Swift" [ref=f1e423]
                  - generic [ref=f1e424]:
                    - button "edit Ubah" [ref=f1e425] [cursor=pointer]:
                      - generic [ref=f1e426]: edit
                      - generic [ref=f1e427]: Ubah
                    - button "delete Hapus" [ref=f1e428] [cursor=pointer]:
                      - generic [ref=f1e429]: delete
                      - generic [ref=f1e430]: Hapus
                - generic [ref=f1e431]:
                  - generic [ref=f1e432]:
                    - generic [ref=f1e434]: SKILL
                    - generic "UI/UX Design" [ref=f1e435]
                  - generic [ref=f1e436]:
                    - button "edit Ubah" [ref=f1e437] [cursor=pointer]:
                      - generic [ref=f1e438]: edit
                      - generic [ref=f1e439]: Ubah
                    - button "delete Hapus" [ref=f1e440] [cursor=pointer]:
                      - generic [ref=f1e441]: delete
                      - generic [ref=f1e442]: Hapus
                - generic [ref=f1e443]:
                  - generic [ref=f1e444]:
                    - generic [ref=f1e446]: SKILL
                    - generic "Figma" [ref=f1e447]
                  - generic [ref=f1e448]:
                    - button "edit Ubah" [ref=f1e449] [cursor=pointer]:
                      - generic [ref=f1e450]: edit
                      - generic [ref=f1e451]: Ubah
                    - button "delete Hapus" [ref=f1e452] [cursor=pointer]:
                      - generic [ref=f1e453]: delete
                      - generic [ref=f1e454]: Hapus
                - generic [ref=f1e455]:
                  - generic [ref=f1e456]:
                    - generic [ref=f1e458]: SKILL
                    - generic "Adobe Photoshop" [ref=f1e459]
                  - generic [ref=f1e460]:
                    - button "edit Ubah" [ref=f1e461] [cursor=pointer]:
                      - generic [ref=f1e462]: edit
                      - generic [ref=f1e463]: Ubah
                    - button "delete Hapus" [ref=f1e464] [cursor=pointer]:
                      - generic [ref=f1e465]: delete
                      - generic [ref=f1e466]: Hapus
                - generic [ref=f1e467]:
                  - generic [ref=f1e468]:
                    - generic [ref=f1e470]: SKILL
                    - generic "Adobe Illustrator" [ref=f1e471]
                  - generic [ref=f1e472]:
                    - button "edit Ubah" [ref=f1e473] [cursor=pointer]:
                      - generic [ref=f1e474]: edit
                      - generic [ref=f1e475]: Ubah
                    - button "delete Hapus" [ref=f1e476] [cursor=pointer]:
                      - generic [ref=f1e477]: delete
                      - generic [ref=f1e478]: Hapus
                - generic [ref=f1e479]:
                  - generic [ref=f1e480]:
                    - generic [ref=f1e482]: SKILL
                    - generic "Wireframing & Prototyping" [ref=f1e483]
                  - generic [ref=f1e484]:
                    - button "edit Ubah" [ref=f1e485] [cursor=pointer]:
                      - generic [ref=f1e486]: edit
                      - generic [ref=f1e487]: Ubah
                    - button "delete Hapus" [ref=f1e488] [cursor=pointer]:
                      - generic [ref=f1e489]: delete
                      - generic [ref=f1e490]: Hapus
                - generic [ref=f1e491]:
                  - generic [ref=f1e492]:
                    - generic [ref=f1e494]: SKILL
                    - generic "Machine Learning" [ref=f1e495]
                  - generic [ref=f1e496]:
                    - button "edit Ubah" [ref=f1e497] [cursor=pointer]:
                      - generic [ref=f1e498]: edit
                      - generic [ref=f1e499]: Ubah
                    - button "delete Hapus" [ref=f1e500] [cursor=pointer]:
                      - generic [ref=f1e501]: delete
                      - generic [ref=f1e502]: Hapus
                - generic [ref=f1e503]:
                  - generic [ref=f1e504]:
                    - generic [ref=f1e506]: SKILL
                    - generic "Deep Learning" [ref=f1e507]
                  - generic [ref=f1e508]:
                    - button "edit Ubah" [ref=f1e509] [cursor=pointer]:
                      - generic [ref=f1e510]: edit
                      - generic [ref=f1e511]: Ubah
                    - button "delete Hapus" [ref=f1e512] [cursor=pointer]:
                      - generic [ref=f1e513]: delete
                      - generic [ref=f1e514]: Hapus
                - generic [ref=f1e515]:
                  - generic [ref=f1e516]:
                    - generic [ref=f1e518]: SKILL
                    - generic "Data Analysis" [ref=f1e519]
                  - generic [ref=f1e520]:
                    - button "edit Ubah" [ref=f1e521] [cursor=pointer]:
                      - generic [ref=f1e522]: edit
                      - generic [ref=f1e523]: Ubah
                    - button "delete Hapus" [ref=f1e524] [cursor=pointer]:
                      - generic [ref=f1e525]: delete
                      - generic [ref=f1e526]: Hapus
                - generic [ref=f1e527]:
                  - generic [ref=f1e528]:
                    - generic [ref=f1e530]: SKILL
                    - generic "Pandas & NumPy" [ref=f1e531]
                  - generic [ref=f1e532]:
                    - button "edit Ubah" [ref=f1e533] [cursor=pointer]:
                      - generic [ref=f1e534]: edit
                      - generic [ref=f1e535]: Ubah
                    - button "delete Hapus" [ref=f1e536] [cursor=pointer]:
                      - generic [ref=f1e537]: delete
                      - generic [ref=f1e538]: Hapus
                - generic [ref=f1e539]:
                  - generic [ref=f1e540]:
                    - generic [ref=f1e542]: SKILL
                    - generic "TensorFlow / PyTorch" [ref=f1e543]
                  - generic [ref=f1e544]:
                    - button "edit Ubah" [ref=f1e545] [cursor=pointer]:
                      - generic [ref=f1e546]: edit
                      - generic [ref=f1e547]: Ubah
                    - button "delete Hapus" [ref=f1e548] [cursor=pointer]:
                      - generic [ref=f1e549]: delete
                      - generic [ref=f1e550]: Hapus
                - generic [ref=f1e551]:
                  - generic [ref=f1e552]:
                    - generic [ref=f1e554]: SKILL
                    - generic "Natural Language Processing (NLP)" [ref=f1e555]
                  - generic [ref=f1e556]:
                    - button "edit Ubah" [ref=f1e557] [cursor=pointer]:
                      - generic [ref=f1e558]: edit
                      - generic [ref=f1e559]: Ubah
                    - button "delete Hapus" [ref=f1e560] [cursor=pointer]:
                      - generic [ref=f1e561]: delete
                      - generic [ref=f1e562]: Hapus
                - generic [ref=f1e563]:
                  - generic [ref=f1e564]:
                    - generic [ref=f1e566]: SKILL
                    - generic "Computer Vision" [ref=f1e567]
                  - generic [ref=f1e568]:
                    - button "edit Ubah" [ref=f1e569] [cursor=pointer]:
                      - generic [ref=f1e570]: edit
                      - generic [ref=f1e571]: Ubah
                    - button "delete Hapus" [ref=f1e572] [cursor=pointer]:
                      - generic [ref=f1e573]: delete
                      - generic [ref=f1e574]: Hapus
                - generic [ref=f1e575]:
                  - generic [ref=f1e576]:
                    - generic [ref=f1e578]: SKILL
                    - generic "Git & GitHub" [ref=f1e579]
                  - generic [ref=f1e580]:
                    - button "edit Ubah" [ref=f1e581] [cursor=pointer]:
                      - generic [ref=f1e582]: edit
                      - generic [ref=f1e583]: Ubah
                    - button "delete Hapus" [ref=f1e584] [cursor=pointer]:
                      - generic [ref=f1e585]: delete
                      - generic [ref=f1e586]: Hapus
                - generic [ref=f1e587]:
                  - generic [ref=f1e588]:
                    - generic [ref=f1e590]: SKILL
                    - generic "Docker" [ref=f1e591]
                  - generic [ref=f1e592]:
                    - button "edit Ubah" [ref=f1e593] [cursor=pointer]:
                      - generic [ref=f1e594]: edit
                      - generic [ref=f1e595]: Ubah
                    - button "delete Hapus" [ref=f1e596] [cursor=pointer]:
                      - generic [ref=f1e597]: delete
                      - generic [ref=f1e598]: Hapus
                - generic [ref=f1e599]:
                  - generic [ref=f1e600]:
                    - generic [ref=f1e602]: SKILL
                    - generic "Linux" [ref=f1e603]
                  - generic [ref=f1e604]:
                    - button "edit Ubah" [ref=f1e605] [cursor=pointer]:
                      - generic [ref=f1e606]: edit
                      - generic [ref=f1e607]: Ubah
                    - button "delete Hapus" [ref=f1e608] [cursor=pointer]:
                      - generic [ref=f1e609]: delete
                      - generic [ref=f1e610]: Hapus
                - generic [ref=f1e611]:
                  - generic [ref=f1e612]:
                    - generic [ref=f1e614]: SKILL
                    - generic "RESTful API" [ref=f1e615]
                  - generic [ref=f1e616]:
                    - button "edit Ubah" [ref=f1e617] [cursor=pointer]:
                      - generic [ref=f1e618]: edit
                      - generic [ref=f1e619]: Ubah
                    - button "delete Hapus" [ref=f1e620] [cursor=pointer]:
                      - generic [ref=f1e621]: delete
                      - generic [ref=f1e622]: Hapus
                - generic [ref=f1e623]:
                  - generic [ref=f1e624]:
                    - generic [ref=f1e626]: SKILL
                    - generic "Arduino" [ref=f1e627]
                  - generic [ref=f1e628]:
                    - button "edit Ubah" [ref=f1e629] [cursor=pointer]:
                      - generic [ref=f1e630]: edit
                      - generic [ref=f1e631]: Ubah
                    - button "delete Hapus" [ref=f1e632] [cursor=pointer]:
                      - generic [ref=f1e633]: delete
                      - generic [ref=f1e634]: Hapus
                - generic [ref=f1e635]:
                  - generic [ref=f1e636]:
                    - generic [ref=f1e638]: SKILL
                    - generic "Raspberry Pi" [ref=f1e639]
                  - generic [ref=f1e640]:
                    - button "edit Ubah" [ref=f1e641] [cursor=pointer]:
                      - generic [ref=f1e642]: edit
                      - generic [ref=f1e643]: Ubah
                    - button "delete Hapus" [ref=f1e644] [cursor=pointer]:
                      - generic [ref=f1e645]: delete
                      - generic [ref=f1e646]: Hapus
                - generic [ref=f1e647]:
                  - generic [ref=f1e648]:
                    - generic [ref=f1e650]: SKILL
                    - generic "Internet of Things (IoT)" [ref=f1e651]
                  - generic [ref=f1e652]:
                    - button "edit Ubah" [ref=f1e653] [cursor=pointer]:
                      - generic [ref=f1e654]: edit
                      - generic [ref=f1e655]: Ubah
                    - button "delete Hapus" [ref=f1e656] [cursor=pointer]:
                      - generic [ref=f1e657]: delete
                      - generic [ref=f1e658]: Hapus
            - generic [ref=f1e659]: "Status: Siap dipetakan"
          - generic [ref=f1e661]:
            - generic [ref=f1e662]:
              - generic [ref=f1e663]:
                - generic [ref=f1e664]:
                  - generic [ref=f1e665]: explore
                  - generic [ref=f1e667]:
                    - generic [ref=f1e668]:
                      - heading "Kategori Minat" [level=2] [ref=f1e669]
                      - generic [ref=f1e670]: "15"
                    - paragraph [ref=f1e671]: Aspirasi topik proyek, industri, dan minat eksplorasi mahasiswa.
                - button "add Tambah Minat" [ref=f1e672] [cursor=pointer]:
                  - generic [ref=f1e673]: add
                  - generic [ref=f1e674]: Tambah Minat
              - generic [ref=f1e675]:
                - generic: search
                - textbox "Cari nama minat atau kategori..." [ref=f1e676]
              - generic [ref=f1e677]:
                - generic [ref=f1e678]:
                  - generic [ref=f1e679]:
                    - generic [ref=f1e681]: MINAT
                    - generic "Web" [ref=f1e682]
                  - generic [ref=f1e683]:
                    - button "edit Ubah" [ref=f1e684] [cursor=pointer]:
                      - generic [ref=f1e685]: edit
                      - generic [ref=f1e686]: Ubah
                    - button "delete Hapus" [ref=f1e687] [cursor=pointer]:
                      - generic [ref=f1e688]: delete
                      - generic [ref=f1e689]: Hapus
                - generic [ref=f1e690]:
                  - generic [ref=f1e691]:
                    - generic [ref=f1e693]: MINAT
                    - generic "Web Development" [ref=f1e694]
                  - generic [ref=f1e695]:
                    - button "edit Ubah" [ref=f1e696] [cursor=pointer]:
                      - generic [ref=f1e697]: edit
                      - generic [ref=f1e698]: Ubah
                    - button "delete Hapus" [ref=f1e699] [cursor=pointer]:
                      - generic [ref=f1e700]: delete
                      - generic [ref=f1e701]: Hapus
                - generic [ref=f1e702]:
                  - generic [ref=f1e703]:
                    - generic [ref=f1e705]: MINAT
                    - generic "Mobile App Development" [ref=f1e706]
                  - generic [ref=f1e707]:
                    - button "edit Ubah" [ref=f1e708] [cursor=pointer]:
                      - generic [ref=f1e709]: edit
                      - generic [ref=f1e710]: Ubah
                    - button "delete Hapus" [ref=f1e711] [cursor=pointer]:
                      - generic [ref=f1e712]: delete
                      - generic [ref=f1e713]: Hapus
                - generic [ref=f1e714]:
                  - generic [ref=f1e715]:
                    - generic [ref=f1e717]: MINAT
                    - generic "Artificial Intelligence & ML" [ref=f1e718]
                  - generic [ref=f1e719]:
                    - button "edit Ubah" [ref=f1e720] [cursor=pointer]:
                      - generic [ref=f1e721]: edit
                      - generic [ref=f1e722]: Ubah
                    - button "delete Hapus" [ref=f1e723] [cursor=pointer]:
                      - generic [ref=f1e724]: delete
                      - generic [ref=f1e725]: Hapus
                - generic [ref=f1e726]:
                  - generic [ref=f1e727]:
                    - generic [ref=f1e729]: MINAT
                    - generic "Data Science & Analytics" [ref=f1e730]
                  - generic [ref=f1e731]:
                    - button "edit Ubah" [ref=f1e732] [cursor=pointer]:
                      - generic [ref=f1e733]: edit
                      - generic [ref=f1e734]: Ubah
                    - button "delete Hapus" [ref=f1e735] [cursor=pointer]:
                      - generic [ref=f1e736]: delete
                      - generic [ref=f1e737]: Hapus
                - generic [ref=f1e738]:
                  - generic [ref=f1e739]:
                    - generic [ref=f1e741]: MINAT
                    - generic "IoT & Smart Device" [ref=f1e742]
                  - generic [ref=f1e743]:
                    - button "edit Ubah" [ref=f1e744] [cursor=pointer]:
                      - generic [ref=f1e745]: edit
                      - generic [ref=f1e746]: Ubah
                    - button "delete Hapus" [ref=f1e747] [cursor=pointer]:
                      - generic [ref=f1e748]: delete
                      - generic [ref=f1e749]: Hapus
                - generic [ref=f1e750]:
                  - generic [ref=f1e751]:
                    - generic [ref=f1e753]: MINAT
                    - generic "Game Development" [ref=f1e754]
                  - generic [ref=f1e755]:
                    - button "edit Ubah" [ref=f1e756] [cursor=pointer]:
                      - generic [ref=f1e757]: edit
                      - generic [ref=f1e758]: Ubah
                    - button "delete Hapus" [ref=f1e759] [cursor=pointer]:
                      - generic [ref=f1e760]: delete
                      - generic [ref=f1e761]: Hapus
                - generic [ref=f1e762]:
                  - generic [ref=f1e763]:
                    - generic [ref=f1e765]: MINAT
                    - generic "Cybersecurity" [ref=f1e766]
                  - generic [ref=f1e767]:
                    - button "edit Ubah" [ref=f1e768] [cursor=pointer]:
                      - generic [ref=f1e769]: edit
                      - generic [ref=f1e770]: Ubah
                    - button "delete Hapus" [ref=f1e771] [cursor=pointer]:
                      - generic [ref=f1e772]: delete
                      - generic [ref=f1e773]: Hapus
                - generic [ref=f1e774]:
                  - generic [ref=f1e775]:
                    - generic [ref=f1e777]: MINAT
                    - generic "Cloud Computing" [ref=f1e778]
                  - generic [ref=f1e779]:
                    - button "edit Ubah" [ref=f1e780] [cursor=pointer]:
                      - generic [ref=f1e781]: edit
                      - generic [ref=f1e782]: Ubah
                    - button "delete Hapus" [ref=f1e783] [cursor=pointer]:
                      - generic [ref=f1e784]: delete
                      - generic [ref=f1e785]: Hapus
                - generic [ref=f1e786]:
                  - generic [ref=f1e787]:
                    - generic [ref=f1e789]: MINAT
                    - generic "Desain Produk Digital" [ref=f1e790]
                  - generic [ref=f1e791]:
                    - button "edit Ubah" [ref=f1e792] [cursor=pointer]:
                      - generic [ref=f1e793]: edit
                      - generic [ref=f1e794]: Ubah
                    - button "delete Hapus" [ref=f1e795] [cursor=pointer]:
                      - generic [ref=f1e796]: delete
                      - generic [ref=f1e797]: Hapus
                - generic [ref=f1e798]:
                  - generic [ref=f1e799]:
                    - generic [ref=f1e801]: MINAT
                    - generic "Kewirausahaan & Startup" [ref=f1e802]
                  - generic [ref=f1e803]:
                    - button "edit Ubah" [ref=f1e804] [cursor=pointer]:
                      - generic [ref=f1e805]: edit
                      - generic [ref=f1e806]: Ubah
                    - button "delete Hapus" [ref=f1e807] [cursor=pointer]:
                      - generic [ref=f1e808]: delete
                      - generic [ref=f1e809]: Hapus
                - generic [ref=f1e810]:
                  - generic [ref=f1e811]:
                    - generic [ref=f1e813]: MINAT
                    - generic "Lomba Karya Tulis Ilmiah (LKTI)" [ref=f1e814]
                  - generic [ref=f1e815]:
                    - button "edit Ubah" [ref=f1e816] [cursor=pointer]:
                      - generic [ref=f1e817]: edit
                      - generic [ref=f1e818]: Ubah
                    - button "delete Hapus" [ref=f1e819] [cursor=pointer]:
                      - generic [ref=f1e820]: delete
                      - generic [ref=f1e821]: Hapus
                - generic [ref=f1e822]:
                  - generic [ref=f1e823]:
                    - generic [ref=f1e825]: MINAT
                    - generic "Hackathon & Coding Competition" [ref=f1e826]
                  - generic [ref=f1e827]:
                    - button "edit Ubah" [ref=f1e828] [cursor=pointer]:
                      - generic [ref=f1e829]: edit
                      - generic [ref=f1e830]: Ubah
                    - button "delete Hapus" [ref=f1e831] [cursor=pointer]:
                      - generic [ref=f1e832]: delete
                      - generic [ref=f1e833]: Hapus
                - generic [ref=f1e834]:
                  - generic [ref=f1e835]:
                    - generic [ref=f1e837]: MINAT
                    - generic "Proyek Tugas Akhir / Skripsi" [ref=f1e838]
                  - generic [ref=f1e839]:
                    - button "edit Ubah" [ref=f1e840] [cursor=pointer]:
                      - generic [ref=f1e841]: edit
                      - generic [ref=f1e842]: Ubah
                    - button "delete Hapus" [ref=f1e843] [cursor=pointer]:
                      - generic [ref=f1e844]: delete
                      - generic [ref=f1e845]: Hapus
                - generic [ref=f1e846]:
                  - generic [ref=f1e847]:
                    - generic [ref=f1e849]: MINAT
                    - generic "Pengabdian Masyarakat" [ref=f1e850]
                  - generic [ref=f1e851]:
                    - button "edit Ubah" [ref=f1e852] [cursor=pointer]:
                      - generic [ref=f1e853]: edit
                      - generic [ref=f1e854]: Ubah
                    - button "delete Hapus" [ref=f1e855] [cursor=pointer]:
                      - generic [ref=f1e856]: delete
                      - generic [ref=f1e857]: Hapus
            - generic [ref=f1e858]: "Status: Digunakan di kuesioner"
        - generic [ref=f1e860]:
          - generic [ref=f1e861]:
            - generic [ref=f1e862]: lightbulb
            - generic [ref=f1e864]:
              - heading "Tips Pengelolaan Taksonomi SkillMatch" [level=4] [ref=f1e865]
              - paragraph [ref=f1e866]: Kategori yang aktif langsung disinkronkan ke mesin rekomendasi tim. Perubahan nama atau penghapusan kategori akan tetap mempertahankan riwayat kecocokan proyek sebelumnya tanpa memutus koneksi profil mahasiswa.
          - generic [ref=f1e867]: Sinkronisasi Aktif
  - generic [ref=f1e874] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=f1e875]
    - generic [ref=f1e879]:
      - button "Open issues overlay" [ref=f1e880]:
        - generic [ref=f1e881]:
          - generic [aria-hidden] [ref=f1e882]: "0"
          - generic [ref=f1e883]: "1"
        - generic [ref=f1e884]: Insight
      - button "Collapse issues badge" [ref=f1e885]
  - alert [ref=f1e888]
```

# Test source

```ts
  1   | // Fitur admin: Kelola Kategori Skill/Minat + Statistik + Hapus pengguna
  2   | const { test, expect, setSesi, buatTag, kodeUnik, auth } = require('./support/fixtures');
  3   | 
  4   | // Baris item kategori: elemen terdalam yang memuat nama tag dan tombol "Ubah"
  5   | function barisKategori(page, nama) {
  6   |   return page
  7   |     .locator('div')
  8   |     .filter({ hasText: nama })
  9   |     .filter({ has: page.getByRole('button', { name: /Ubah/ }) })
  10  |     .last();
  11  | }
  12  | 
  13  | test.describe('Kelola Kategori (tampilan)', () => {
  14  |   test.beforeEach(async ({ page, admin }) => {
  15  |     await setSesi(page, admin);
  16  |     await page.goto('/admin/kategori');
  17  |     await expect(page.getByRole('heading', { name: 'Kelola Kategori Skill/Minat' })).toBeVisible();
  18  |   });
  19  | 
  20  |   test('menampilkan panel Skill dan Minat', async ({ page }) => {
> 21  |     await expect(page.getByRole('heading', { name: 'Kategori Skill' })).toBeVisible();
      |                                                                         ^ Error: expect(locator).toBeVisible() failed
  22  |     await expect(page.getByRole('heading', { name: 'Kategori Minat' })).toBeVisible();
  23  |     await expect(page.getByRole('button', { name: /Tambah Skill/ })).toBeVisible();
  24  |     await expect(page.getByRole('button', { name: /Tambah Minat/ })).toBeVisible();
  25  |   });
  26  | 
  27  |   test('menambah kategori skill baru', async ({ page, trackTag }) => {
  28  |     const nama = `E2E Skill ${kodeUnik()}`;
  29  |     trackTag(nama);
  30  |     await page.getByRole('button', { name: /Tambah Skill/ }).click();
  31  |     await expect(page.getByRole('heading', { name: 'Tambah Kategori Skill' })).toBeVisible();
  32  | 
  33  |     await page.locator('#nama_tag').fill(nama);
  34  |     await page.locator('#kategori').fill('Pengujian');
  35  |     await page.getByRole('button', { name: /Simpan$/ }).click();
  36  | 
  37  |     await expect(page.getByRole('alert').filter({ hasText: `Kategori "${nama}" berhasil ditambahkan!` })).toBeVisible();
  38  |     await expect(page.getByText(nama, { exact: true })).toBeVisible();
  39  |   });
  40  | 
  41  |   test('menambah kategori minat baru', async ({ page, trackTag }) => {
  42  |     const nama = `E2E Minat ${kodeUnik()}`;
  43  |     trackTag(nama);
  44  |     await page.getByRole('button', { name: /Tambah Minat/ }).click();
  45  |     await expect(page.getByRole('heading', { name: 'Tambah Kategori Minat' })).toBeVisible();
  46  |     await page.locator('#nama_tag').fill(nama);
  47  |     await page.getByRole('button', { name: /Simpan$/ }).click();
  48  |     await expect(page.getByRole('alert').filter({ hasText: 'berhasil ditambahkan' })).toBeVisible();
  49  |     await expect(page.getByText(nama, { exact: true })).toBeVisible();
  50  |   });
  51  | 
  52  |   test('nama kategori kosong ditolak', async ({ page }) => {
  53  |     await page.getByRole('button', { name: /Tambah Skill/ }).click();
  54  |     await page.getByRole('button', { name: /Simpan$/ }).click();
  55  |     await expect(page.getByText('Nama kategori wajib diisi')).toBeVisible();
  56  |   });
  57  | 
  58  |   test('nama kategori yang sudah ada ditolak', async ({ page, request, admin, trackTag }) => {
  59  |     const tag = await buatTag(request, admin);
  60  |     trackTag(tag.nama_tag);
  61  |     await page.reload();
  62  |     await page.getByRole('button', { name: /Tambah Skill/ }).click();
  63  |     await page.locator('#nama_tag').fill(tag.nama_tag);
  64  |     await page.getByRole('button', { name: /Simpan$/ }).click();
  65  |     await expect(page.getByText('Nama kategori sudah ada')).toBeVisible();
  66  |   });
  67  | 
  68  |   test('tombol Batal menutup form tanpa menyimpan', async ({ page }) => {
  69  |     await page.getByRole('button', { name: /Tambah Skill/ }).click();
  70  |     await expect(page.getByRole('heading', { name: 'Tambah Kategori Skill' })).toBeVisible();
  71  |     await page.getByRole('button', { name: 'Batal' }).click();
  72  |     await expect(page.getByRole('heading', { name: 'Tambah Kategori Skill' })).toBeHidden();
  73  |   });
  74  | 
  75  |   test('mengubah nama kategori', async ({ page, request, admin, trackTag }) => {
  76  |     const tag = await buatTag(request, admin);
  77  |     trackTag(tag.nama_tag);
  78  |     const namaBaru = `${tag.nama_tag} v2`;
  79  |     trackTag(namaBaru);
  80  |     await page.reload();
  81  | 
  82  |     await barisKategori(page, tag.nama_tag).getByRole('button', { name: /Ubah/ }).click();
  83  |     await expect(page.getByRole('heading', { name: 'Ubah Kategori Skill' })).toBeVisible();
  84  |     await expect(page.locator('#nama_tag')).toHaveValue(tag.nama_tag);
  85  |     await page.locator('#nama_tag').fill(namaBaru);
  86  |     await page.getByRole('button', { name: /Perbarui$/ }).click();
  87  | 
  88  |     await expect(page.getByRole('alert').filter({ hasText: 'berhasil diperbarui' })).toBeVisible();
  89  |     await expect(page.getByText(namaBaru, { exact: true })).toBeVisible();
  90  |   });
  91  | 
  92  |   test('menghapus kategori dengan dialog konfirmasi', async ({ page, request, admin, trackTag }) => {
  93  |     const tag = await buatTag(request, admin);
  94  |     trackTag(tag.nama_tag);
  95  |     await page.reload();
  96  | 
  97  |     await barisKategori(page, tag.nama_tag).getByRole('button', { name: /Hapus/ }).click();
  98  |     await expect(page.getByRole('heading', { name: 'Hapus Kategori' })).toBeVisible();
  99  |     await page.getByRole('button', { name: /Hapus$/ }).last().click(); // tombol konfirmasi ada di dialog (paling akhir di DOM)
  100 | 
  101 |     await expect(page.getByRole('alert').filter({ hasText: 'berhasil dihapus' })).toBeVisible();
  102 |     await expect(page.getByText(tag.nama_tag, { exact: true })).toBeHidden();
  103 |   });
  104 | 
  105 |   test('batal pada dialog hapus tidak menghapus kategori', async ({ page, request, admin, trackTag }) => {
  106 |     const tag = await buatTag(request, admin);
  107 |     trackTag(tag.nama_tag);
  108 |     await page.reload();
  109 |     await barisKategori(page, tag.nama_tag).getByRole('button', { name: /Hapus/ }).click();
  110 |     await page.getByRole('button', { name: 'Batal' }).click();
  111 |     await expect(page.getByText(tag.nama_tag, { exact: true })).toBeVisible();
  112 |   });
  113 | 
  114 |   test('pencarian di panel Skill memfilter daftar', async ({ page, request, admin, trackTag }) => {
  115 |     const tag = await buatTag(request, admin);
  116 |     trackTag(tag.nama_tag);
  117 |     await page.reload();
  118 |     const cari = page.getByPlaceholder('Cari nama skill atau kategori...');
  119 | 
  120 |     await cari.fill(tag.nama_tag);
  121 |     await expect(page.getByText(tag.nama_tag, { exact: true })).toBeVisible();
```
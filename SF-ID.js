 // Preset Data Configurations
        const PRESETS = {
            spock: {
                name: "SPOCK",
                rank: "SCIENCE OFFICER",
                serial: "SC-V-231-4798",
                height: "187 cm",
                weight: "78 kg",
                marks: "SURGICAL LASER SCAR RIGHT SHOULDER (PARTIAL SCAPULA REPLACEMENT); PHASER-2 BURN MARK, LEFT THIGH; SERPENTINE DESIGN INSIDE OF RIGHT BICEPS (VULCAN KAHS-WAN RITUAL MARK.)"
            },
            mccoy: {
                name: "LEONARD H. MCCOY, M.D.",
                rank: "CHIEF MEDICAL OFFICER",
                serial: "CMO-EARTH-9942",
                height: "180 cm",
                weight: "74 kg",
                marks: "HYPOSPRAY CALLUS ON RIGHT THUMB; HIGH-STRESS GASTRIC ULCER SCAR; CHRONIC GRUMBLING REGARDING TRANSPORTER MOLECULAR DISASSEMBLY; SWEET TEA TOLERANCE HIGH."
            },
            captain: {
                name: "CAPTAIN JAMES T. KIRK",
                rank: "COMMANDING OFFICER",
                serial: "NCC-1701-CMD",
                height: "178 cm",
                weight: "77 kg",
                marks: "HIGH RESISTANCE TO LOGICAL MONOTONY; CERTIFIED GOLDEN RETRIEVER."
            },
            scotty: {
                name: "MONTGOMERY SCOTT",
                rank: "CHIEF ENGINEERING OFFICER",
                serial: "SE-337-0149",
                height: "175 cm",
                weight: "79 kg",
                marks: "MULTIPLE MINOR PLASMA-TORCH BURNS ON FINGERTIPS; LITHIUM CRACKLE HEARING LOSS IN LEFT EAR; SCAR ON RIGHT FOREARM FROM A RUN-IN WITH AN UNCOOPERATIVE REPLICATOR; UNBREAKABLE RELIGIOUS DEVOTION TO DILITHIUM CRYSTALS AND SCOTCH."
            },
        };

        // Web Audio API Sound Effects Synthesizer
        let audioEnabled = true;
        let audioCtx = null;

        function initAudio() {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
        }

        function playBeep(freq = 800, duration = 0.05, type = 'sine') {
            if (!audioEnabled) return;
            try {
                initAudio();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = type;
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + duration);
            } catch (e) {
                console.warn("Audio Context blocked or unsupported");
            }
        }

        function playFaxSound() {
            if (!audioEnabled) return;
            initAudio();
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    playBeep(400 + Math.random() * 800, 0.03, 'square');
                }, i * 60);
            }
        }

        // Toggle Audio State
        document.getElementById('audioToggleBtn').addEventListener('click', () => {
            audioEnabled = !audioEnabled;
            document.getElementById('audioIcon').textContent = audioEnabled ? '🔊' : '🔇';
            document.getElementById('audioText').textContent = audioEnabled ? 'Audio ON' : 'Audio OFF';
            if (audioEnabled) playBeep(1200, 0.08);
        });

        // Procedural Dithered Fingerprint Generator on HTML5 Canvas
        function drawFingerprint(canvasId) {
            const canvas = document.getElementById(canvasId);
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const w = canvas.width = 60;
            const h = canvas.height = 80;

            // Clear Background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, w, h);

            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1.2;

            const cx = w / 2 + (Math.random() * 8 - 4);
            const cy = h / 2 + (Math.random() * 8 - 4);
            const numRings = 10 + Math.floor(Math.random() * 6);

            // Draw concentric whorls/loops
            for (let r = 3; r < numRings * 3.5; r += 2.8) {
                ctx.beginPath();
                const points = 24;
                for (let i = 0; i <= points; i++) {
                    const angle = (i / points) * Math.PI * 2;
                    const distortion = Math.sin(angle * 3) * 1.5 + (Math.random() * 0.8);
                    const rx = r + distortion;
                    const ry = (r * 1.3) + distortion; 
                    const x = cx + Math.cos(angle) * rx;
                    const y = cy + Math.sin(angle) * ry;

                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            // Add noisy dither spots
            const imgData = ctx.getImageData(0, 0, w, h);
            const data = imgData.data;
            for (let i = 0; i < data.length; i += 4) {
                if (Math.random() < 0.12) {
                    const noise = Math.random() < 0.5 ? 0 : 255;
                    data[i] = noise;
                    data[i+1] = noise;
                    data[i+2] = noise;
                }
            }
            ctx.putImageData(imgData, 0, 0);
        }

        function generateRandomFingerprints() {
            const prints = ['fpR1', 'fpR2', 'fpR3', 'fpR4', 'fpR5', 'fpL1', 'fpL2', 'fpL3', 'fpL4', 'fpL5'];
            prints.forEach(id => drawFingerprint(id));
            playFaxSound();
        }

        // Attach click listeners to fingerprint canvases
        document.querySelectorAll('.fingerprint-canvas').forEach(canvas => {
            canvas.addEventListener('click', () => {
                drawFingerprint(canvas.id);
                playBeep(1100, 0.04, 'square');
            });
        });

        // Card Live Binding Updates
        function updateCard() {
            const nameVal = document.getElementById('inputName').value.toUpperCase();
            const rankVal = document.getElementById('inputRank').value.toUpperCase();
            document.getElementById('displayNameRank').textContent = `${nameVal} • ${rankVal}`;
            document.getElementById('displaySerial').textContent = document.getElementById('inputSerial').value.toUpperCase();
            document.getElementById('displayHeight').textContent = document.getElementById('inputHeight').value;
            document.getElementById('displayWeight').textContent = document.getElementById('inputWeight').value;
            document.getElementById('displayMarks').textContent = document.getElementById('inputMarks').value.toUpperCase();
            playBeep(600, 0.01);
        }

        // Subspace Transmission Scan Animation Effect
        function triggerTransmissionEffect() {
            const card = document.getElementById('identiFaxCard');
            if (!card) return;
            
            card.classList.remove('transmitting');
            void card.offsetWidth; // Force reflow
            card.classList.add('transmitting');
            playFaxSound();

            setTimeout(() => {
                card.classList.remove('transmitting');
            }, 600);
        }

        // Load Personnel Presets (Unified)
        function loadPreset(key) {
            const p = PRESETS[key];
            if (!p) return;

            document.getElementById('inputName').value = p.name;
            document.getElementById('inputRank').value = p.rank;
            document.getElementById('inputSerial').value = p.serial;
            document.getElementById('inputHeight').value = p.height;
            document.getElementById('inputWeight').value = p.weight;
            document.getElementById('inputMarks').value = p.marks;

            // Update CSS image preset class on card container
            const card = document.getElementById('identiFaxCard');
            card.classList.remove('preset-spock', 'preset-mccoy', 'preset-captain', 'preset-scotty');
            card.classList.add(`preset-${key}`);

            // Reset custom inline background images if custom upload was previously used
            document.getElementById('profileFrontImg').style.backgroundImage = '';
            document.getElementById('profileSideImg').style.backgroundImage = '';

            updateCard();
            generateRandomFingerprints();
            
            // Trigger transmission scan line animation & sound
            triggerTransmissionEffect();
        }

        function resetCustom() {
            document.getElementById('inputName').value = "UNKNOWN CREWMEMBER";
            document.getElementById('inputRank').value = "ENSIGN";
            document.getElementById('inputSerial').value = "SC-7700-00";
            document.getElementById('inputHeight').value = "170 cm";
            document.getElementById('inputWeight').value = "65 kg";
            document.getElementById('inputMarks').value = "NO REMARKABLE DYSFUNCTION DETECTED.";

            const card = document.getElementById('identiFaxCard');
            card.classList.remove('preset-spock', 'preset-mccoy', 'preset-captain', 'preset-scotty');

            document.getElementById('profileFrontImg').style.backgroundImage = '';
            document.getElementById('profileSideImg').style.backgroundImage = '';

            updateCard();
            generateRandomFingerprints();
            triggerTransmissionEffect();
        }

        // Handle Image Uploads
        function handleImageUpload(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    document.getElementById('profileFrontImg').style.backgroundImage = `url('${evt.target.result}')`;
                    document.getElementById('profileSideImg').style.backgroundImage = `url('${evt.target.result}')`;
                    playBeep(900, 0.08);
                };
                reader.readAsDataURL(file);
            }
        }

        function updateImageFromUrl(url) {
            if (url.trim() !== '') {
                document.getElementById('profileFrontImg').style.backgroundImage = `url('${url}')`;
                document.getElementById('profileSideImg').style.backgroundImage = `url('${url}')`;
                playBeep(900, 0.08);
            }
        }

        // Toggles: Multi-Theme & CRT Scanlines
        const themes = ['standard', 'blueprint', 'matrix', 'vulcan'];
        let currentThemeIndex = 0;

        function toggleTheme() {
            const card = document.getElementById('identiFaxCard');
            
            card.classList.remove('blueprint-mode', 'matrix-mode', 'vulcan-mode');

            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            const newTheme = themes[currentThemeIndex];

            if (newTheme === 'blueprint') {
                card.classList.add('blueprint-mode');
            } else if (newTheme === 'matrix') {
                card.classList.add('matrix-mode');
            } else if (newTheme === 'vulcan') {
                card.classList.add('vulcan-mode');
            }

            const themeBtn = document.getElementById('themeToggleBtn');
            if (themeBtn) {
                const names = {
                    standard: '📄 Thermal Standard',
                    blueprint: '📐 Starfleet Blueprint',
                    matrix: '📟 Matrix Cyberpunk',
                    vulcan: '🌋 Vulcan Forge'
                };
                themeBtn.textContent = names[newTheme];
            }

            playBeep(1000 + (currentThemeIndex * 150), 0.05);
        }

        let scanlinesActive = true;
        function toggleScanlines() {
            const outer = document.getElementById('cardOuterContainer');
            scanlinesActive = !scanlinesActive;
            if (scanlinesActive) {
                outer.classList.add('crt-overlay');
            } else {
                outer.classList.remove('crt-overlay');
            }
            playBeep(700, 0.04);
        }

        // Print / Screenshot Export trigger
        function printCard() {
            triggerTransmissionEffect();
            setTimeout(() => {
                window.print();
            }, 400);
        }

        // Initial Load Initialization
        window.onload = function() {
            generateRandomFingerprints();
            updateCard();
        };

        // Classified Stamps Modal Data & Logic
        const classifiedData = {
            eyesOnly: {
                title: "EYES ONLY // COMMAND DIRECTIVE",
                content: `
                    <p class="font-bold text-amber-400">STARFLEET COMMAND SECURITY ADVISORY:</p>
                    <p>Personnel dossiers processed through the Subspace Thermal Telefax Relay are bound by General Order 7. Unauthorized duplication, optical capture, or unauthorized distribution of Vulcan neuro-pressure records, medical anomalies, or engineering logs will result in immediate reassignment to cargo duty on the Antares sector run.</p>
                    <p class="text-gray-400 mt-2">-- AUTHENTICATED BY ADMIRAL CARTWRIGHT</p>
                `
            },
            intel: {
                title: "SECTION 31 // ANOMALOUS ARCHIVES",
                content: `
                    <p class="font-bold text-amber-400">ARCHIVAL NOTES ON USS ENTERPRISE CREW:</p>
                    <p><strong class="text-white">SPOCK:</strong> Subject exhibits standard Vulcan physiological variance. Scapula reconstruction notes verified following 2267 security breach.</p>
                    <p><strong class="text-white">MCCOY:</strong> High tolerance for emotional outbursts disguised as medical complaints. Frequent use of hypospray noted.</p>
                    <p><strong class="text-white">SCOTTY:</strong> Maintains an unrecorded religious reverence for dilithium purity tolerances that supersedes standard Starfleet engineering safety margins.</p>
                `
            }
        };

        function openClassifiedModal(type) {
            const data = classifiedData[type];
            if (!data) return;

            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalBody').innerHTML = data.content;
            document.getElementById('classifiedModal').classList.remove('hidden');
            
            playBeep(1400, 0.04, 'square');
            setTimeout(() => playBeep(900, 0.06, 'sine'), 50);
        }

        function closeClassifiedModal() {
            document.getElementById('classifiedModal').classList.add('hidden');
            playBeep(600, 0.03, 'sine');
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeClassifiedModal();
            }
        });

        // Download Card as PNG Image via html2canvas
        function downloadCardPNG() {
            triggerTransmissionEffect();
            const card = document.getElementById('identiFaxCard');
            if (!card) return;

            // Wait briefly for the transmission effect sound to fire
            setTimeout(() => {
                html2canvas(card, {
                    scale: 2, // High resolution output
                    useCORS: true,
                    backgroundColor: null
                }).then(canvas => {
                    const name = document.getElementById('inputName').value.trim() || 'CREWMEMBER';
                    const fileName = `IDENTI-FAX_${name.replace(/[^a-zA-Z0-9]/g, '_')}.png`;

                    const link = document.createElement('a');
                    link.download = fileName;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                    playBeep(1200, 0.08, 'sine');
                }).catch(err => {
                    console.error("Failed to generate PNG:", err);
                });
            }, 300);
        }

        // Generate & Copy Shareable URL Hash
        function generateShareLink() {
            const data = {
                name: document.getElementById('inputName').value,
                rank: document.getElementById('inputRank').value,
                serial: document.getElementById('inputSerial').value,
                height: document.getElementById('inputHeight').value,
                weight: document.getElementById('inputWeight').value,
                marks: document.getElementById('inputMarks').value
            };

            // Convert to URL parameters
            const params = new URLSearchParams(data);
            window.location.hash = params.toString();

            // Copy full URL to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                playBeep(1300, 0.05, 'square');
                alert('🔗 STARFLEET TRANSMISSION URL COPIED TO CLIPBOARD!');
            }).catch(() => {
                alert('URL updated in address bar! Copy the page link to share.');
            });
        }

        // Read URL Hash Parameters on Page Load
        function loadCardFromURLHash() {
            if (!window.location.hash || window.location.hash.length < 2) return false;

            try {
                const params = new URLSearchParams(window.location.hash.substring(1));
                if (params.has('name')) document.getElementById('inputName').value = params.get('name');
                if (params.has('rank')) document.getElementById('inputRank').value = params.get('rank');
                if (params.has('serial')) document.getElementById('inputSerial').value = params.get('serial');
                if (params.has('height')) document.getElementById('inputHeight').value = params.get('height');
                if (params.has('weight')) document.getElementById('inputWeight').value = params.get('weight');
                if (params.has('marks')) document.getElementById('inputMarks').value = params.get('marks');

                updateCard();
                return true;
            } catch (e) {
                console.warn("Could not parse URL parameters");
                return false;
            }
        }
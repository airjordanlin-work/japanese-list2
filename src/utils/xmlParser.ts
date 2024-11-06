// src/utils/xmlParser.ts

// Update the VocabularyEntry interface to include romaji as an optional field
export interface VocabularyEntry {
    kanji: string;
    reading: string;
    meanings: string[];
    romaji?: string; // Add romaji as an optional property
}

// Cache variable to store the parsed vocabulary data
let cachedVocabList: VocabularyEntry[] | null = null;

// Load and cache the vocabulary data
export async function loadVocabularyData(): Promise<VocabularyEntry[]> {
    if (cachedVocabList) return cachedVocabList;

    const response = await fetch('/JMdict_e.xml');
    if (!response.ok) {
        console.error("Failed to load JMdict_e.xml");
        return [];
    }

    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'application/xml');

    const entries = xmlDoc.getElementsByTagName('entry');
    const vocabList: VocabularyEntry[] = [];

    for (let i = 0; i < entries.length; i++) {
        const kanji = entries[i].getElementsByTagName('keb')[0]?.textContent || '';
        const reading = entries[i].getElementsByTagName('reb')[0]?.textContent || '';
        const meanings = Array.from(entries[i].getElementsByTagName('gloss')).map(gloss => gloss.textContent || '');

        vocabList.push({ kanji, reading, meanings });
    }

    cachedVocabList = vocabList;
    return vocabList;
}

// Romaji conversion for hiragana (simple mapping)
const hiraganaToRomaji: { [key: string]: string } = {
    あ: "a", い: "i", う: "u", え: "e", お: "o",
    か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
    さ: "sa", し: "shi", す: "su", せ: "se", そ: "so",
    た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
    な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no",
    は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
    ま: "ma", み: "mi", む: "mu", め: "me", も: "mo",
    や: "ya", ゆ: "yu", よ: "yo",
    ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro",
    わ: "wa", を: "wo", ん: "n",
    が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go",
    ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo",
    だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do",
    ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo",
    ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po",
    きゃ: "kya", きゅ: "kyu", きょ: "kyo",
    しゃ: "sha", しゅ: "shu", しょ: "sho",
    ちゃ: "cha", ちゅ: "chu", ちょ: "cho",
    にゃ: "nya", にゅ: "nyu", にょ: "nyo",
    ひゃ: "hya", ひゅ: "hyu", ひょ: "hyo",
    みゃ: "mya", みゅ: "myu", みょ: "myo",
    りゃ: "rya", りゅ: "ryu", りょ: "ryo",
    ぎゃ: "gya", ぎゅ: "gyu", ぎょ: "gyo",
    じゃ: "ja", じゅ: "ju", じょ: "jo",
    びゃ: "bya", びゅ: "byu", びょ: "byo",
    ぴゃ: "pya", ぴゅ: "pyu", ぴょ: "pyo",

    ア: "a", イ: "i", ウ: "u", エ: "e", オ: "o",
    カ: "ka", キ: "ki", ク: "ku", ケ: "ke", コ: "ko",
    サ: "sa", シ: "shi", ス: "su", セ: "se", ソ: "so",
    タ: "ta", チ: "chi", ツ: "tsu", テ: "te", ト: "to",
    ナ: "na", ニ: "ni", ヌ: "nu", ネ: "ne", ノ: "no",
    ハ: "ha", ヒ: "hi", フ: "fu", ヘ: "he", ホ: "ho",
    マ: "ma", ミ: "mi", ム: "mu", メ: "me", モ: "mo",
    ヤ: "ya", ユ: "yu", ヨ: "yo",
    ラ: "ra", リ: "ri", ル: "ru", レ: "re", ロ: "ro",
    ワ: "wa", ヲ: "wo", ン: "n",
    ガ: "ga", ギ: "gi", グ: "gu", ゲ: "ge", ゴ: "go",
    ザ: "za", ジ: "ji", ズ: "zu", ゼ: "ze", ゾ: "zo",
    ダ: "da", ヂ: "ji", ヅ: "zu", デ: "de", ド: "do",
    バ: "ba", ビ: "bi", ブ: "bu", ベ: "be", ボ: "bo",
    パ: "pa", ピ: "pi", プ: "pu", ペ: "pe", ポ: "po",
    キャ: "kya", キュ: "kyu", キョ: "kyo",
    シャ: "sha", シュ: "shu", ショ: "sho",
    チャ: "cha", チュ: "chu", チョ: "cho",
    ニャ: "nya", ニュ: "nyu", ニョ: "nyo",
    ヒャ: "hya", ヒュ: "hyu", ヒョ: "hyo",
    ミャ: "mya", ミュ: "myu", ミョ: "myo",
    リャ: "rya", リュ: "ryu", リョ: "ryo",
    ギャ: "gya", ギュ: "gyu", ギョ: "gyo",
    ジャ: "ja", ジュ: "ju", ジョ: "jo",
    ビャ: "bya", ビュ: "byu", ビョ: "byo",
    ピャ: "pya", ピュ: "pyu", ピョ: "pyo"
};
function convertToRomaji(kana: string): string {
    const kanaChars = kana.match(/(きゃ|きゅ|きょ|しゃ|しゅ|しょ|ちゃ|ちゅ|ちょ|にゃ|にゅ|にょ|ひゃ|ひゅ|ひょ|みゃ|みゅ|みょ|りゃ|りゅ|りょ|ぎゃ|ぎゅ|ぎょ|じゃ|じゅ|じょ|びゃ|びゅ|びょ|ぴゃ|ぴゅ|ぴょ|キャ|キュ|キョ|シャ|シュ|ショ|チャ|チュ|チョ|ニャ|ニュ|ニョ|ヒャ|ヒュ|ヒョ|ミャ|ミュ|ミョ|リャ|リュ|リョ|ギャ|ギュ|ギョ|ジャ|ジュ|ジョ|ビャ|ビュ|ビョ|ピャ|ピュ|ピョ|[あ-んア-ン])/g);
    if (!kanaChars) return "";

    return kanaChars.map(char => hiraganaToRomaji[char] || char).join("");
}


// Search function to find an exact word match in the vocabulary data
export async function searchWord(word: string): Promise<VocabularyEntry[]> {
    const vocabList = await loadVocabularyData();

    const isEnglish = /^[a-zA-Z]+$/.test(word);

    // Filter to find exact matches in meanings for English input, or in kanji/reading for Japanese input
    return vocabList.filter((entry) => {
        if (isEnglish) {
            return entry.meanings.some(meaning => meaning.toLowerCase() === word.toLowerCase());
        } else {
            return entry.kanji === word || entry.reading === word;
        }
    }).map(entry => ({
        ...entry,
        romaji: entry.reading ? convertToRomaji(entry.reading) : "" // Add romaji field
    }));
}

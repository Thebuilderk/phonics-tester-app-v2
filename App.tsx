import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { registerRootComponent } from 'expo';

// ── Types ──────────────────────────────────────────────
interface Sound {
  id: string;
  grapheme: string;
  phoneme: string;
  phonemeIpa: string;
  type: string;
  keywords: string[];
  exampleWords: { word: string; blendingPriority: number }[];
  commonConfusions: string[];
  troubleshootingTip: string;
}

interface PhraseSet {
  id: string;
  setNumber: number;
  label: string;
  sounds: Sound[];
}

interface Phase {
  label: string;
  sets: PhraseSet[];
}

// ── Data (from phonics-phase1-2-structure.json) ────────
const PHASES: Phase[] = [
  {
    label: 'Phase 1 — Initial Sounds',
    sets: [
      {
        id: 'phase1.set1', setNumber: 1, label: 'Set 1',
        sounds: [
          { id:'s', grapheme:'s', phoneme:'/s/', phonemeIpa:'/s/', type:'consonant', keywords:['sun','sock','sand','star'], exampleWords:[{word:'sun',blendingPriority:1},{word:'sock',blendingPriority:2},{word:'sand',blendingPriority:3},{word:'star',blendingPriority:4}], commonConfusions:['/sh/'], troubleshootingTip:'Teeth close together but do not touch; air flows through a narrow channel.' },
          { id:'a', grapheme:'a', phoneme:'/a/', phonemeIpa:'/æ/', type:'vowel', keywords:['ant','apple','arm','air'], exampleWords:[{word:'ant',blendingPriority:1},{word:'apple',blendingPriority:2},{word:'arm',blendingPriority:3},{word:'air',blendingPriority:4}], commonConfusions:['/æ/ vs /e/'], troubleshootingTip:'Open mouth wide, tongue low and relaxed.' },
          { id:'t', grapheme:'t', phoneme:'/t/', phonemeIpa:'/t/', type:'consonant', keywords:['top','tent','tiger','tree'], exampleWords:[{word:'top',blendingPriority:1},{word:'tent',blendingPriority:2},{word:'tiger',blendingPriority:3},{word:'tree',blendingPriority:4}], commonConfusions:['/d/'], troubleshootingTip:'Tongue tip touches the alveolar ridge and releases sharply.' },
          { id:'p', grapheme:'p', phoneme:'/p/', phonemeIpa:'/p/', type:'consonant', keywords:['pig','pat','penguin','pink'], exampleWords:[{word:'pig',blendingPriority:1},{word:'pat',blendingPriority:2},{word:'penguin',blendingPriority:3},{word:'pink',blendingPriority:4}], commonConfusions:['/b/'], troubleshootingTip:'Lips close together and pop open with a puff of air.' },
        ],
      },
      {
        id: 'phase1.set2', setNumber: 2, label: 'Set 2',
        sounds: [
          { id:'i', grapheme:'i', phoneme:'/i/', phonemeIpa:'/ɪ/', type:'vowel', keywords:['in','iguana','itch','ink'], exampleWords:[{word:'in',blendingPriority:1},{word:'iguana',blendingPriority:2},{word:'itch',blendingPriority:3},{word:'ink',blendingPriority:4}], commonConfusions:['/ɪ/ vs /iː/'], troubleshootingTip:'Short, crisp vowel; lips spread slightly.' },
          { id:'n', grapheme:'n', phoneme:'/n/', phonemeIpa:'/n/', type:'consonant', keywords:['net','nest','nose','night'], exampleWords:[{word:'net',blendingPriority:1},{word:'nest',blendingPriority:2},{word:'nose',blendingPriority:3},{word:'night',blendingPriority:4}], commonConfusions:['/ŋ/'], troubleshootingTip:'Tongue tip touches the alveolar ridge; air flows through the nose.' },
          { id:'m', grapheme:'m', phoneme:'/m/', phonemeIpa:'/m/', type:'consonant', keywords:['mat','moon','mouse','milk'], exampleWords:[{word:'mat',blendingPriority:1},{word:'moon',blendingPriority:2},{word:'mouse',blendingPriority:3},{word:'milk',blendingPriority:4}], commonConfusions:['nasal quality too long'], troubleshootingTip:'Lips close and hum; keep the sound short and clean.' },
          { id:'d', grapheme:'d', phoneme:'/d/', phonemeIpa:'/d/', type:'consonant', keywords:['dog','dinosaur','door','duck'], exampleWords:[{word:'dog',blendingPriority:1},{word:'dinosaur',blendingPriority:2},{word:'door',blendingPriority:3},{word:'duck',blendingPriority:4}], commonConfusions:['/t/'], troubleshootingTip:'Tongue touches the ridge behind the top teeth and releases with voice.' },
        ],
      },
      {
        id: 'phase1.set3', setNumber: 3, label: 'Set 3',
        sounds: [
          { id:'g', grapheme:'g', phoneme:'/g/', phonemeIpa:'/g/', type:'consonant', keywords:['goat','gap','garden','gun'], exampleWords:[{word:'goat',blendingPriority:1},{word:'gap',blendingPriority:2},{word:'garden',blendingPriority:3},{word:'gun',blendingPriority:4}], commonConfusions:['/dʒ/'], troubleshootingTip:'Voiced velar plosive; ensure voicing continues through the release.' },
          { id:'o', grapheme:'o', phoneme:'/o/', phonemeIpa:'/ɒ/', type:'vowel', keywords:['octopus','open','orange','owl'], exampleWords:[{word:'octopus',blendingPriority:1},{word:'open',blendingPriority:2},{word:'orange',blendingPriority:3},{word:'owl',blendingPriority:4}], commonConfusions:['/ɒ/ vs /ɔː/'], troubleshootingTip:'Short rounded vowel; lips forward and rounded.' },
          { id:'c', grapheme:'c', phoneme:'/k/', phonemeIpa:'/k/', type:'consonant', keywords:['cat','cake','car','cup'], exampleWords:[{word:'cat',blendingPriority:1},{word:'cake',blendingPriority:2},{word:'car',blendingPriority:3},{word:'cup',blendingPriority:4}], commonConfusions:['soft c /s/ vs hard c /k/'], troubleshootingTip:'C introduces the hard /k/ sound before a, o, u at this stage.' },
          { id:'k', grapheme:'k', phoneme:'/k/', phonemeIpa:'/k/', type:'consonant', keywords:['kite','kitchen','kangaroo','key'], exampleWords:[{word:'kite',blendingPriority:1},{word:'kitchen',blendingPriority:2},{word:'kangaroo',blendingPriority:3},{word:'key',blendingPriority:4}], commonConfusions:['c vs k confusion'], troubleshootingTip:'K introduced alongside C to avoid confusion; same phoneme, different graphemes.' },
        ],
      },
      {
        id: 'phase1.set4', setNumber: 4, label: 'Set 4',
        sounds: [
          { id:'ck', grapheme:'ck', phoneme:'/k/', phonemeIpa:'/k/', type:'consonant-digraph', keywords:['duck','truck','clock','sock'], exampleWords:[{word:'duck',blendingPriority:1},{word:'truck',blendingPriority:2},{word:'clock',blendingPriority:3},{word:'sock',blendingPriority:4}], commonConfusions:['ck vs k'], troubleshootingTip:'First digraph introduced. Two letters, one sound.' },
          { id:'e', grapheme:'e', phoneme:'/e/', phonemeIpa:'/ɛ/', type:'vowel', keywords:['egg','elephant','envelope','elbow'], exampleWords:[{word:'egg',blendingPriority:1},{word:'elephant',blendingPriority:2},{word:'envelope',blendingPriority:3},{word:'elbow',blendingPriority:4}], commonConfusions:['/ɛ/ vs /e/'], troubleshootingTip:'Open-mid front vowel; tongue mid-low, jaw half-open.' },
          { id:'u', grapheme:'u', phoneme:'/u/', phonemeIpa:'/ʌ/', type:'vowel', keywords:['umbrella','under','up','udder'], exampleWords:[{word:'umbrella',blendingPriority:1},{word:'under',blendingPriority:2},{word:'up',blendingPriority:3},{word:'udder',blendingPriority:4}], commonConfusions:['/ʌ/ vs /uː/'], troubleshootingTip:'Short lax vowel; tongue low-central, relaxed jaw.' },
          { id:'r', grapheme:'r', phoneme:'/r/', phonemeIpa:'/r/', type:'consonant', keywords:['rabbit','rainbow','rocket','rhino'], exampleWords:[{word:'rabbit',blendingPriority:1},{word:'rainbow',blendingPriority:2},{word:'rocket',blendingPriority:3},{word:'rhino',blendingPriority:4}], commonConfusions:['/r/ vs /w/'], troubleshootingTip:'Bunched or retroflex tongue position; avoid adding a schwa.' },
        ],
      },
    ],
  },
  {
    label: 'Phase 2 — Expanding Sounds',
    sets: [
      {
        id: 'phase2.set1', setNumber: 1, label: 'Set 1',
        sounds: [
          { id:'h', grapheme:'h', phoneme:'/h/', phonemeIpa:'/h/', type:'consonant', keywords:['hat','horse','house','hook'], exampleWords:[{word:'hat',blendingPriority:1},{word:'horse',blendingPriority:2},{word:'house',blendingPriority:3},{word:'hook',blendingPriority:4}], commonConfusions:[], troubleshootingTip:'Voiceless glottal fricative; soft, breathy sound.' },
          { id:'b', grapheme:'b', phoneme:'/b/', phonemeIpa:'/b/', type:'consonant', keywords:['bat','ball','bear','book'], exampleWords:[{word:'bat',blendingPriority:1},{word:'ball',blendingPriority:2},{word:'bear',blendingPriority:3},{word:'book',blendingPriority:4}], commonConfusions:['/p/'], troubleshootingTip:'Voiced bilabial plosive; lips close, then open with voice.' },
          { id:'f', grapheme:'f', phoneme:'/f/', phonemeIpa:'/f/', type:'consonant', keywords:['fan','fish','fox','frog'], exampleWords:[{word:'fan',blendingPriority:1},{word:'fish',blendingPriority:2},{word:'fox',blendingPriority:3},{word:'frog',blendingPriority:4}], commonConfusions:['/v/'], troubleshootingTip:'Voiceless labiodental fricative; upper teeth lightly touch lower lip, air flows out.' },
          { id:'ff', grapheme:'ff', phoneme:'/f/', phonemeIpa:'/f/', type:'consonant-digraph', keywords:['puff','off','muffin','giraffe'], exampleWords:[{word:'puff',blendingPriority:1},{word:'off',blendingPriority:2},{word:'muffin',blendingPriority:3},{word:'giraffe',blendingPriority:4}], commonConfusions:['f vs ff'], troubleshootingTip:'Double F often used at the end of words or in the middle; same sound as single F.' },
          { id:'l', grapheme:'l', phoneme:'/l/', phonemeIpa:'/l/', type:'consonant', keywords:['lamp','lion','leaf','lemon'], exampleWords:[{word:'lamp',blendingPriority:1},{word:'lion',blendingPriority:2},{word:'leaf',blendingPriority:3},{word:'lemon',blendingPriority:4}], commonConfusions:['dark l'], troubleshootingTip:'Light L at the start of words, tongue tip touches alveolar ridge.' },
          { id:'ll', grapheme:'ll', phoneme:'/l/', phonemeIpa:'/l/', type:'consonant-digraph', keywords:['bell','ball','hill','doll'], exampleWords:[{word:'bell',blendingPriority:1},{word:'ball',blendingPriority:2},{word:'hill',blendingPriority:3},{word:'doll',blendingPriority:4}], commonConfusions:['l vs ll'], troubleshootingTip:'Double L usually at the end of words or in the middle; same sound as single L.' },
          { id:'ss', grapheme:'ss', phoneme:'/s/', phonemeIpa:'/s/', type:'consonant-digraph', keywords:['pass','kiss','dress','grass'], exampleWords:[{word:'pass',blendingPriority:1},{word:'kiss',blendingPriority:2},{word:'dress',blendingPriority:3},{word:'grass',blendingPriority:4}], commonConfusions:['s vs ss'], troubleshootingTip:'Double S usually at the end of words or in the middle; same sound as single S.' },
        ],
      },
      {
        id: 'phase2.set2', setNumber: 2, label: 'Set 2',
        sounds: [
          { id:'j', grapheme:'j', phoneme:'/j/', phonemeIpa:'/dʒ/', type:'consonant', keywords:['jam','jet','jug','jump'], exampleWords:[{word:'jam',blendingPriority:1},{word:'jet',blendingPriority:2},{word:'jug',blendingPriority:3},{word:'jump',blendingPriority:4}], commonConfusions:['/ch/'], troubleshootingTip:'Voiced palato-alveolar affricate; tongue touches hard palate, then air releases with voice.' },
          { id:'v', grapheme:'v', phoneme:'/v/', phonemeIpa:'/v/', type:'consonant', keywords:['van','vest','violin','vase'], exampleWords:[{word:'van',blendingPriority:1},{word:'vest',blendingPriority:2},{word:'violin',blendingPriority:3},{word:'vase',blendingPriority:4}], commonConfusions:['/f/'], troubleshootingTip:'Voiced labiodental fricative; upper teeth lightly touch lower lip, air flows out with voice.' },
          { id:'w', grapheme:'w', phoneme:'/w/', phonemeIpa:'/w/', type:'consonant', keywords:['water','window','watch','wave'], exampleWords:[{word:'water',blendingPriority:1},{word:'window',blendingPriority:2},{word:'watch',blendingPriority:3},{word:'wave',blendingPriority:4}], commonConfusions:['/wh/'], troubleshootingTip:'Voiced bilabial-velar approximant; rounded lips, tongue moves back.' },
          { id:'x', grapheme:'x', phoneme:'/ks/', phonemeIpa:'/ks/', type:'consonant', keywords:['fox','box','exit','x-ray'], exampleWords:[{word:'fox',blendingPriority:1},{word:'box',blendingPriority:2},{word:'exit',blendingPriority:3},{word:'x-ray',blendingPriority:4}], commonConfusions:['/z/ at beginning of words'], troubleshootingTip:'Represents two sounds, /k/ and /s/, blended together.' },
        ],
      },
      {
        id: 'phase2.set3', setNumber: 3, label: 'Set 3',
        sounds: [
          { id:'y', grapheme:'y', phoneme:'/y/', phonemeIpa:'/j/', type:'consonant', keywords:['yak','yellow','yogurt','yawn'], exampleWords:[{word:'yak',blendingPriority:1},{word:'yellow',blendingPriority:2},{word:'yogurt',blendingPriority:3},{word:'yawn',blendingPriority:4}], commonConfusions:['long i sound'], troubleshootingTip:'Voiced palatal approximant; tongue raised towards hard palate, not touching.' },
          { id:'z', grapheme:'z', phoneme:'/z/', phonemeIpa:'/z/', type:'consonant', keywords:['zebra','zip','zoo','zero'], exampleWords:[{word:'zebra',blendingPriority:1},{word:'zip',blendingPriority:2},{word:'zoo',blendingPriority:3},{word:'zero',blendingPriority:4}], commonConfusions:['/s/'], troubleshootingTip:'Voiced alveolar fricative; similar to /s/, but with voice.' },
          { id:'zz', grapheme:'zz', phoneme:'/z/', phonemeIpa:'/z/', type:'consonant-digraph', keywords:['buzz','fizz','jazz','whizz'], exampleWords:[{word:'buzz',blendingPriority:1},{word:'fizz',blendingPriority:2},{word:'jazz',blendingPriority:3},{word:'whizz',blendingPriority:4}], commonConfusions:['z vs zz'], troubleshootingTip:'Double Z usually at the end of words or in the middle; same sound as single Z.' },
          { id:'qu', grapheme:'qu', phoneme:'/kw/', phonemeIpa:'/kw/', type:'consonant-digraph', keywords:['queen','quack','quiet','quiz'], exampleWords:[{word:'queen',blendingPriority:1},{word:'quack',blendingPriority:2},{word:'quiet',blendingPriority:3},{word:'quiz',blendingPriority:4}], commonConfusions:['/k/'], troubleshootingTip:'Always appears together; two sounds, /k/ and /w/, blended.' },
          { id:'ch', grapheme:'ch', phoneme:'/ch/', phonemeIpa:'/tʃ/', type:'consonant-digraph', keywords:['chair','chicken','cheese','chop'], exampleWords:[{word:'chair',blendingPriority:1},{word:'chicken',blendingPriority:2},{word:'cheese',blendingPriority:3},{word:'chop',blendingPriority:4}], commonConfusions:['/sh/'], troubleshootingTip:'Voiceless palato-alveolar affricate; tongue touches hard palate, then air releases without voice.' },
          { id:'sh', grapheme:'sh', phoneme:'/sh/', phonemeIpa:'/ʃ/', type:'consonant-digraph', keywords:['ship','shoe','shell','shop'], exampleWords:[{word:'ship',blendingPriority:1},{word:'shoe',blendingPriority:2},{word:'shell',blendingPriority:3},{word:'shop',blendingPriority:4}], commonConfusions:['/s/'], troubleshootingTip:'Voiceless palato-alveolar fricative; lips rounded, air flows out quietly.' },
          { id:'th-voiced', grapheme:'th', phoneme:'/th/', phonemeIpa:'/ð/', type:'consonant-digraph', keywords:['this','that','then','them'], exampleWords:[{word:'this',blendingPriority:1},{word:'that',blendingPriority:2},{word:'then',blendingPriority:3},{word:'them',blendingPriority:4}], commonConfusions:['th unvoiced'], troubleshootingTip:'Voiced dental fricative; tongue tip lightly between teeth, air flows out with voice.' },
          { id:'th-unvoiced', grapheme:'th', phoneme:'/th/', phonemeIpa:'/θ/', type:'consonant-digraph', keywords:['thin','think','thumb','three'], exampleWords:[{word:'thin',blendingPriority:1},{word:'think',blendingPriority:2},{word:'thumb',blendingPriority:3},{word:'three',blendingPriority:4}], commonConfusions:['th voiced'], troubleshootingTip:'Voiceless dental fricative; tongue tip lightly between teeth, air flows out without voice.' },
          { id:'ng', grapheme:'ng', phoneme:'/ng/', phonemeIpa:'/ŋ/', type:'consonant-digraph', keywords:['sing','king','ring','long'], exampleWords:[{word:'sing',blendingPriority:1},{word:'king',blendingPriority:2},{word:'ring',blendingPriority:3},{word:'long',blendingPriority:4}], commonConfusions:['/n/'], troubleshootingTip:'Voiced velar nasal; back of tongue touches soft palate, air flows through nose.' },
        ],
      },
    ],
  },
];

export default function App() {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [selectedSet, setSelectedSet] = useState<PhraseSet | null>(null);
  const [selectedSound, setSelectedSound] = useState<Sound | null>(null);

  const renderPhaseItem = ({ item }: { item: Phase }) => (
    <TouchableOpacity
      style={[styles.listItem, selectedPhase?.label === item.label && styles.selectedListItem]}
      onPress={() => {
        setSelectedPhase(item);
        setSelectedSet(null);
        setSelectedSound(null);
      }}
    >
      <Text style={styles.listItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderSetItem = ({ item }: { item: PhraseSet }) => (
    <TouchableOpacity
      style={[styles.listItem, selectedSet?.id === item.id && styles.selectedListItem]}
      onPress={() => {
        setSelectedSet(item);
        setSelectedSound(null);
      }}
    >
      <Text style={styles.listItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderSoundItem = ({ item }: { item: Sound }) => (
    <TouchableOpacity
      style={[styles.listItem, selectedSound?.id === item.id && styles.selectedListItem]}
      onPress={() => setSelectedSound(item)}
    >
      <Text style={styles.listItemText}>{item.grapheme} {item.phoneme}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.header}>Phonics Tester App v2</Text>

        <ScrollView horizontal style={styles.phaseSelector}>
          <FlatList
            data={PHASES}
            renderItem={renderPhaseItem}
            keyExtractor={(item) => item.label}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </ScrollView>

        {selectedPhase && (
          <ScrollView horizontal style={styles.setSelector}>
            <FlatList
              data={selectedPhase.sets}
              renderItem={renderSetItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </ScrollView>
        )}

        {selectedSet && (
          <ScrollView horizontal style={styles.soundSelector}>
            <FlatList
              data={selectedSet.sounds}
              renderItem={renderSoundItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </ScrollView>
        )}

        {selectedSound ? (
          <ScrollView style={styles.detailsContainer}>
            <Text style={styles.detailHeader}>Sound Details</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Grapheme:</Text> {selectedSound.grapheme}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Phoneme:</Text> {selectedSound.phoneme} {selectedSound.phonemeIpa}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Type:</Text> {selectedSound.type}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Keywords:</Text> {selectedSound.keywords.join(', ')}</Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Example Words:</Text>{' '}
              {selectedSound.exampleWords
                .sort((a, b) => a.blendingPriority - b.blendingPriority)
                .map((ew) => ew.word)
                .join(', ')}
            </Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Common Confusions:</Text> {selectedSound.commonConfusions.join(', ')}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Troubleshooting Tip:</Text> {selectedSound.troubleshootingTip}</Text>
          </ScrollView>
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Select a Phase, Set, and Sound to view details.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  phaseSelector: {
    height: 60,
    marginBottom: 10,
    width: '100%',
  },
  setSelector: {
    height: 60,
    marginBottom: 10,
    width: '100%',
  },
  soundSelector: {
    height: 60,
    marginBottom: 20,
    width: '100%',
  },
  listItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
  },
  selectedListItem: {
    backgroundColor: '#a7d9ff', // A distinct color for selected items
    borderWidth: 1,
    borderColor: '#007bff',
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
  },
  detailsContainer: {
    flex: 1,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeholderText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
  },
});

registerRootComponent(App);
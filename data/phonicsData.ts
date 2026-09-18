export interface PhonicsDataItem {
  id: string;
  sound: string;
  type: string;
  word: string;
}

export const phonicsData: PhonicsDataItem[] = [
  { "id": "1", "sound": "k-a-t", "type": "CVC", "word": "cat" },
  { "id": "2", "sound": "d-o-g", "type": "CVC", "word": "dog" },
  { "id": "3", "sound": "s-u-n", "type": "CVC", "word": "sun" },
  { "id": "4", "sound": "h-e-n", "type": "CVC", "word": "hen" },
  { "id": "5", "sound": "p-i-g", "type": "CVC", "word": "pig" },
  { "id": "6", "sound": "b-a-t", "type": "CVC", "word": "bat" },
  { "id": "7", "sound": "f-i-n", "type": "CVC", "word": "fin" },
  { "id": "8", "sound": "m-o-p", "type": "CVC", "word": "mop" },
  { "id": "9", "sound": "t-u-b", "type": "CVC", "word": "tub" },
  { "id": "10", "sound": "j-e-t", "type": "CVC", "word": "jet" }
];

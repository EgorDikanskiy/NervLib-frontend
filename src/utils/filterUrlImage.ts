import avatar from 'assets/avatar.jpg';

export function filterUrlImage(str: string | undefined) {
  if (str == '') {
    return str;
  }
  return avatar;
}

import { Toast } from 'vant';
export function loading() {
    Toast.loading({
        message: 'loading...',
        forbidClick: true,
        duration:0
    });
}

export function success() {
    Toast.clear()
    Toast.success('success');
}

export function fail() {
    Toast.clear()
    Toast.fail('fail');
}
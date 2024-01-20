describe('createInitCode', () => {
    let envFactoryAddress: string;

    beforeAll(() => {
        envFactoryAddress = process.env.FACTORY_ADDRESS || "";
        process.env.FACTORY_ADDRESS = '0x0000000000000000000000000000000000000000';
    })

    afterAll(() => {
        process.env.FACTORY_ADDRESS = envFactoryAddress;
    })

    it('should return correct init code', async () => {
        const { createInitCode } = await import("../../ts/send_zk_uop");
        const { encodeFunctionData } = await import("viem");
        const { abi } = await import('../../../../packages/contracts/build/ZKMynaWalletFactory.sol/ZKMynaWalletFactory.json');
        jest.mock('viem', () => ({
            ...jest.requireActual('viem'),
            encodeFunctionData: jest.fn(),
        }))

        const identityCommitment = '0x123';
        const salt = 0n;
        const mockedEncodeFunctionData = '456';
        (encodeFunctionData as jest.Mock).mockReturnValue(mockedEncodeFunctionData);

        const initCode = createInitCode(identityCommitment, salt);

        expect(encodeFunctionData).toHaveBeenCalledWith({
            abi: abi,
            functionName: 'createAccount',
            args: [identityCommitment, salt],
        });
        expect(initCode).toBe(`${process.env.FACTORY_ADDRESS}${mockedEncodeFunctionData}`);
    });
});

describe('generateDummyZKPSignature', () => {
    it('should return correct signature', async () => {
        const { generateDummyZKPSignature } = await import('../../ts/send_zk_uop');
        const expected_result = '0x198705050f6c5ec7ce8d0e3beacd67f2143019213cd285db697cb26ce1aff66716c8f21aa09f9dbada9c17d9ec83dd59e484f12c50689a2df48ef41adc9cde6c0e6da20c7b38c80c3f3cc16f8585cca37ddd80d909adcc32a0ae9a524afe195012083fe96e774eedf83bed1d379c40580426c381250d997e7e9dc9222f5e05d504df90947b055418cb10bf5a37eccdb804797dfc9ad53df220bbde205e7ad98006f65c9ff03b25169869a2f65e98f169eb4859c33cbb3f2e86da11572a21d2891f61fa72e55a56acee6cc98bb28be2274ee93e9d0be4d89a4af39ab37e60123b262fcfceeb87403f870fcec0900de2a1c2908b592ec1c98255fe2ecd2fbbf2bf1efdb9c5013a9706e0c16627c36de8dd60731bd96d5bf705bf3db1801267790a00000000000000000000000000000000014a92b6297dc8b5ffb107949f196baf00000000000000000000000000000000009e1187340bc4fd07167462a34b64310000000000000000000000000000000000ed7428f4493d8d819efa6bf71d77c90000000000000000000000000000000000b5d4ef1307ccccefcd331654707e7000000000000000000000000000000000016e2d82bcf9fc45163273840ea8832200000000000000000000000000000000003fb7da2955b7e1c2877da6184af1c800000000000000000000000000000000013876f6867269b091706adf9e6b1ec000000000000000000000000000000000015822b6a7a18159d530974b18a1bb530000000000000000000000000000000001a29c85d823645c5994c167b83090590000000000000000000000000000000001d43619afdf3f353529fdfa1b4f2152000000000000000000000000000000000189975eed5aa142beae1260bf663efd0000000000000000000000000000000001732fd6983070ea2046900a7c3adb430000000000000000000000000000000001564393bb317edbb1cb57cbfa8049ba0000000000000000000000000000000000ac9e95037ab029dae9f9cea8d81c97000000000000000000000000000000000186b47a64af8ea1b79a07d9a97b846b00000000000000000000000000000000007a42797379374010d310f32536bd9f000000000000000000000000000000000000458b290364b9b0bd1d68984c1896000000000000000000000000000000000154b3e7d909e2e281d716c1269b212d0000000000000000000000000000000000482dd4f9954d79b2b46c1e38767ef6000000000000000000000000000000000000000000000000000000000000375c';
        const actual_result = generateDummyZKPSignature();
        expect(actual_result).toBe(expected_result);
    });
});

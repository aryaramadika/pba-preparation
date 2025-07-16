use std::collections::BTreeMap;

pub struct Pallet {
	block_number: u32,

	pub(crate) nonce: BTreeMap<String, u32>,
}

impl Pallet {
	pub fn new() -> Self {
		Self { block_number: 0, nonce: BTreeMap::new() }
	}
	/// Get the current block number.
	pub fn block_number(&self) -> u32 {
		self.block_number
	}

	/// Increment the block number by one.
	pub fn increment_block_number(&mut self) {
		self.block_number += 1;
	}

	/// Get the nonce for an account `who`.
	pub fn nonce(&self, who: &String) -> u32 {
		*self.nonce.get(who).unwrap_or(&0)
	}

	/// Increment the nonce for an account `who` by one.
	pub fn increment_nonce(&mut self, who: &String) {
		let current_nonce = self.nonce(who);
		self.nonce.insert(who.clone(), current_nonce + 1);
	}
}

#[test]
fn init_system() {
	let mut system = Pallet { block_number: 0, nonce: BTreeMap::new() };
	assert_eq!(system.block_number(), 0);
	system.increment_block_number();
	assert_eq!(system.block_number(), 1);
	let alice = "alice".to_string();
	assert_eq!(system.nonce(&alice), 0);
	system.increment_nonce(&alice);

	let bob = "bob".to_string();
	assert_eq!(system.nonce(&bob), 0);
	system.increment_nonce(&bob);

	assert_eq!(system.nonce(&alice), 1);
	assert_eq!(system.nonce(&bob), 1);
}

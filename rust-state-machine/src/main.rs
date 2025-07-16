mod balances;
mod system;

use std::collections::BTreeMap;

pub struct Runtime {
	balances: balances::Pallet,
	system: system::Pallet,
}

impl Runtime {
	pub fn new() -> Self {
		Self { system: system::Pallet::new(), balances: balances::Pallet::new() }
	}

	pub fn balances(&mut self) -> &mut balances::Pallet {
		&mut self.balances
	}

	pub fn system(&mut self) -> &mut system::Pallet {
		&mut self.system
	}
}

fn main() {
	let mut runtime = Runtime::new();
	runtime.system().increment_block_number();

	let alice = "alice".to_string();
	let bob = "bob".to_string();

	runtime.balances().set_balance(&alice, 100);
	runtime.balances().transfer(alice.clone(), bob.clone(), 50).unwrap();

	assert_eq!(runtime.balances().balance(&alice), 50);
	assert_eq!(runtime.balances().balance(&bob), 50);

	runtime.system().increment_nonce(&alice);
	runtime.system().increment_nonce(&bob);

	assert_eq!(runtime.system().nonce(&alice), 1);
	assert_eq!(runtime.system().nonce(&bob), 1);

	println!("Block number: {}", runtime.system().block_number());
	println!("Alice's balance: {}", runtime.balances().balance(&alice));
	println!("Bob's balance: {}", runtime.balances().balance(&bob));

	/* TODO: Execute another balance transfer, this time from `alice` to `charlie` for 20. */
	let charlie = "charlie".to_string();
	runtime.balances().set_balance(&charlie, 0);
	runtime.balances().transfer(alice.clone(), charlie.clone(), 20).unwrap();
	runtime.system().increment_nonce(&alice); // <-- Add this line
	runtime.system().increment_block_number();
	assert_eq!(runtime.balances().balance(&alice), 30);
	assert_eq!(runtime.balances().balance(&charlie), 20);

	assert_eq!(runtime.system().nonce(&alice), 2);
	assert_eq!(runtime.system().nonce(&charlie), 0);
	assert_eq!(runtime.system().nonce(&bob), 1);
	println!("After transfer:");
	println!("Charlie's nonce: {}", runtime.system().nonce(&charlie));
	println!("Alice's nonce: {}", runtime.system().nonce(&alice));
	println!("Bob's nonce: {}", runtime.system().nonce(&bob));
	println!("Block number: {}", runtime.system().block_number());
	println!("Charlie's balance: {}", runtime.balances().balance(&charlie));
	println!("Alice's new balance: {}", runtime.balances().balance(&alice));
	println!("Bob's balance remains: {}", runtime.balances().balance(&bob));
}
